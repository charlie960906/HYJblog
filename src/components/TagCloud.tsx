"use client";
import React, { useEffect, useRef } from 'react';

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

interface TagItem {
  tag: string;
  count: number;
}

interface TagCloudProps {
  tags: TagItem[];
  width?: number;
  height?: number;
}

export default function TagCloud({ tags, width = 760, height = 480 }: TagCloudProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // clear previous
    container.innerHTML = '';

    const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 1);
    const minFont = 12;
    const maxFont = 48;

    const placedRects: DOMRect[] = [];

    // helper to test overlap
    const overlaps = (r: DOMRect) => placedRects.some(p => !(r.right < p.left || r.left > p.right || r.bottom < p.top || r.top > p.bottom));

    // Greedy placement: largest first
    const sorted = [...tags].sort((a, b) => b.count - a.count);

    const containerRect = container.getBoundingClientRect();
    const cw = container.clientWidth || width || containerRect.width || 760;
    const ch = container.clientHeight || height || containerRect.height || 480;
    const cx = cw / 2;
    const cy = ch / 2;

    sorted.forEach((item, idx) => {
      const fontSize = minFont + (item.count / Math.max(1, maxCount)) * (maxFont - minFont);

      const span = document.createElement('span');
      span.textContent = item.tag;
      span.style.position = 'absolute';
      span.style.fontSize = `${fontSize}px`;
      span.style.whiteSpace = 'nowrap';
      span.style.cursor = 'pointer';
      span.style.zIndex = '1';
      span.style.overflow = 'visible';
      span.style.display = 'inline-block';
      span.className = 'select-none transition-transform hover:scale-110 text-neutral-800 dark:text-neutral-200';
      span.addEventListener('mouseenter', () => { span.style.zIndex = '10'; });
      span.addEventListener('mouseleave', () => { span.style.zIndex = '1'; });

      // temporarily add to measure
      span.style.visibility = 'hidden';
      container.appendChild(span);
      const sz = span.getBoundingClientRect();

      // If first (largest), put in center
      if (idx === 0) {
        const x = Math.max(0, cx - sz.width / 2);
        const y = Math.max(0, cy - sz.height / 2);
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        placedRects.push(span.getBoundingClientRect());
      } else {
        // spiral placement around center
        let placed = false;
        let angle = 0;
        const angleStep = 0.35; // controls density
        const radiusStep = 4; // pixel increment per radian
        const maxAttempts = 5000;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const r = radiusStep * angle;
          const x = Math.round(cx + r * Math.cos(angle) - sz.width / 2);
          const y = Math.round(cy + r * Math.sin(angle) - sz.height / 2);

          // bounds check
          if (x >= 0 && y >= 0 && x + sz.width <= cw && y + sz.height <= ch) {
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            const rect = span.getBoundingClientRect();
            if (!overlaps(rect)) {
              placedRects.push(rect);
              placed = true;
              break;
            }
          }

          angle += angleStep;
        }

        if (!placed) {
          // fallback: place somewhere inside bounding box without overlap
          for (let yTry = 0; yTry < ch - sz.height; yTry += 8) {
            for (let xTry = 0; xTry < cw - sz.width; xTry += 8) {
              span.style.left = `${xTry}px`;
              span.style.top = `${yTry}px`;
              const rect = span.getBoundingClientRect();
              if (!overlaps(rect)) {
                placedRects.push(rect);
                placed = true;
                break;
              }
            }
            if (placed) break;
          }
        }

        if (!placed) {
          // last resort: center near origin
          const x = Math.max(0, Math.round(cx - sz.width / 2));
          const y = Math.max(0, Math.round(cy - sz.height / 2));
          span.style.left = `${x}px`;
          span.style.top = `${y}px`;
          placedRects.push(span.getBoundingClientRect());
        }
      }

      span.style.visibility = 'visible';

      // click navigates to tag page
      span.addEventListener('click', () => {
        window.location.href = `/tags/${encodeURIComponent(item.tag)}`;
      });

      // rotation seeded by tag for deterministic look
      const seed = hashString(item.tag + String(item.count));
      const rotate = (seed % 21) - 10; // -10..10
      span.style.transform = `rotate(${rotate}deg)`;

      container.appendChild(span);
    });

    // cleanup on unmount
    return () => {
      if (container) container.innerHTML = '';
    };
  }, [tags, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px`, position: 'relative', overflow: 'visible' }}
      className="mx-auto overflow-hidden max-w-full w-full"
    />
  );
}
