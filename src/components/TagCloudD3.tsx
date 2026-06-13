"use client";
import React, { useEffect, useRef, useState } from 'react';

interface TagItem {
  tag: string;
  count: number;
}

interface Props {
  tags: TagItem[];
  height?: number;
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export default function TagCloudD3({ tags, height = 480 }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(760);

  // 監聽容器寬度來達成 RWD
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.clientWidth);
      }
    };
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    function measureAndPlace() {
      const w = containerWidth;
      const h = height;

      if (!w || !h) return [] as any[];

      const isMobile = w < 600;
      const padding = isMobile ? 4 : 12; // 手機版縮小間距
      const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 1);
      
      const baseSize = isMobile ? 12 : 14;
      const sizeMultiplier = isMobile ? 36 : 52;

      const words = [...tags]
        .sort((a, b) => b.count - a.count)
        .map(t => ({ 
          text: t.tag, 
          size: baseSize + (t.count / Math.max(1, maxCount)) * sizeMultiplier, 
          original: t 
        }));

      const svgNS = 'http://www.w3.org/2000/svg';
      const tempSvg = document.createElementNS(svgNS, 'svg');
      tempSvg.setAttribute('width', String(w));
      tempSvg.setAttribute('height', String(h));
      tempSvg.style.position = 'fixed';
      tempSvg.style.left = '-9999px';
      tempSvg.style.top = '-9999px';
      document.body.appendChild(tempSvg);

      const measured: Array<any> = [];
      words.forEach(wd => {
        const t = document.createElementNS(svgNS, 'text');
        t.setAttribute('font-size', `${wd.size}px`);
        t.setAttribute('font-family', 'sans-serif');
        t.textContent = wd.text;
        tempSvg.appendChild(t);
        const bbox = t.getBBox();
        measured.push({ ...wd, width: bbox.width, height: bbox.height, bboxY: bbox.y });
        tempSvg.removeChild(t);
      });

      document.body.removeChild(tempSvg);

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const centerX = w / 2;
      const centerY = h / 2;
      const placed: Array<any> = [];

      const overlaps = (r: { left: number; right: number; top: number; bottom: number }) =>
        placed.some(p => !(r.right < p.left || r.left > p.right || r.bottom < p.top || r.top > p.bottom));

      if (measured.length > 0) {
        const first = measured[0];
        const lx = Math.max(0, Math.round(centerX - first.width / 2));
        const ty = Math.max(0, Math.round(centerY - first.height / 2));
        placed.push({ 
          ...first, x: lx, y: ty, angle: 0, 
          left: lx - padding, right: lx + first.width + padding, 
          top: ty - padding, bottom: ty + first.height + padding 
        });
      }

      const rBase = Math.max(10, Math.min(w, h) / 45); 
      for (let i = 1; i < measured.length; i++) {
        const item = measured[i];
        let k = i;
        let placedOk = false;
        const maxAttempts = 3000;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const angle = (k * goldenAngle) % (Math.PI * 2);
          const radius = rBase * Math.sqrt(k);
          
          const px = Math.round(centerX + radius * Math.cos(angle) - item.width / 2);
          const py = Math.round(centerY + radius * Math.sin(angle) - item.height / 2);

          const r = {
            left: px - padding,
            right: px + item.width + padding,
            top: py - padding,
            bottom: py + item.height + padding
          };

          if (r.left >= 0 && r.right <= w && r.top >= 0 && r.bottom <= h) {
            if (!overlaps(r)) {
              placed.push({ ...item, x: px, y: py });
              placedOk = true;
              break;
            }
          }
          k++;
        }
        
        if (!placedOk) {
            placed.push({ ...item, x: Math.random() * (w - item.width), y: Math.random() * (h - item.height) });
        }
      }

      return placed;
    }

    const placedWords = measureAndPlace();
    if (cancelled) return;

    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    svg.setAttribute('width', String(containerWidth));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${containerWidth} ${height}`);

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const colors = [
      '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', 
      '#ec4899', '#06b6d4', '#84cc16', '#6366f1', '#f97316'
    ];

    placedWords.forEach(pw => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(pw.x));
      text.setAttribute('y', String(pw.y - pw.bboxY)); 
      text.setAttribute('font-size', `${pw.size}px`);
      text.setAttribute('font-family', 'sans-serif');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', colors[hashString(pw.text) % colors.length]);
      text.style.cursor = 'pointer';
      text.style.transition = 'all 0.3s ease';
      text.textContent = pw.text;

      text.addEventListener('mouseover', () => {
        text.setAttribute('opacity', '0.7');
        text.setAttribute('transform', `scale(1.1) translate(${pw.x * -0.1}, ${pw.y * -0.1})`);
      });
      text.addEventListener('mouseout', () => {
        text.setAttribute('opacity', '1');
        text.setAttribute('transform', 'none');
      });
      text.addEventListener('click', () => {
        window.location.href = `/tags/${encodeURIComponent(pw.text)}`;
      });

      g.appendChild(text);
    });

    svg.appendChild(g);

    return () => {
      cancelled = true;
    };
  }, [tags, height, containerWidth]);

  return (
    <div ref={wrapperRef} className="w-full flex justify-center items-center overflow-hidden">
      <svg ref={svgRef} className="max-w-full" />
    </div>
  );
}