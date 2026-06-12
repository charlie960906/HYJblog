"use client";
import React, { useEffect, useRef } from 'react';

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
  const sizeRef = useRef({ w: 760, h: height });

  useEffect(() => {
    let cancelled = false;
    const padding = 16; // shared padding for placement and overlap resolution

    function measureAndPlace() {
      const w = sizeRef.current.w;
      const h = sizeRef.current.h;

      if (!w || !h) return [] as any[];

      const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 1);
      const words = [...tags]
        .sort((a, b) => b.count - a.count)
        .map(t => ({ text: t.tag, size: 14 + (t.count / Math.max(1, maxCount)) * 52, original: t }));

      // measure text sizes using temporary SVG
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
        t.setAttribute('font-family', 'serif');
        t.textContent = wd.text;
        tempSvg.appendChild(t);
        const bbox = t.getBBox();
        measured.push({ ...wd, width: bbox.width, height: bbox.height, bboxY: bbox.y });
        tempSvg.removeChild(t);
      });

      document.body.removeChild(tempSvg);

      // place using phyllotaxis (golden angle) with overlap avoidance
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
        placed.push({ ...first, x: lx, y: ty, angle: 0, left: lx - padding, right: lx + first.width + padding, top: ty - padding, bottom: ty + first.height + padding });
      }

      for (let i = 1; i < measured.length; i++) {
        const item = measured[i];
        let k = i;
        let placedOk = false;
        const maxAttempts = 5000; // give more attempts to find free slot
          const rBase = Math.max(18, Math.min(w, h) / 45); // larger base radius for spacing
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          const angle = (k * goldenAngle) % (Math.PI * 2);
          const radius = rBase * Math.sqrt(k) + Math.max(0, 52 - item.size) * 0.6;
          const cx = Math.round(centerX + radius * Math.cos(angle) - item.width / 2);
          const cy = Math.round(centerY + radius * Math.sin(angle) - item.height / 2);
          const rect = { left: cx - padding, right: cx + item.width + padding, top: cy - padding, bottom: cy + item.height + padding };
          if (rect.left >= 0 && rect.top >= 0 && rect.right <= w && rect.bottom <= h && !overlaps(rect)) {
            // store angle for placement direction but do not rotate text to avoid rotated bbox overlap
            placed.push({ ...item, x: cx, y: cy, angle: 0, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });
            placedOk = true;
            break;
          }
          k += 1;
        }
        if (!placedOk) {
          // brute force grid fallback
          let found = false;
          for (let yy = 0; yy < h - item.height && !found; yy += 8) {
            for (let xx = 0; xx < w - item.width; xx += 8) {
              const rect = { left: xx - padding, right: xx + item.width + padding, top: yy - padding, bottom: yy + item.height + padding };
              if (!overlaps(rect) && rect.left >= 0 && rect.top >= 0 && rect.right <= w && rect.bottom <= h) {
                placed.push({ ...item, x: xx, y: yy, angle: 0, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom });
                found = true;
                break;
              }
            }
          }
          if (!found) placed.push({ ...item, x: Math.max(0, Math.round(centerX - item.width / 2)), y: Math.max(0, Math.round(centerY - item.height / 2)), angle: 0, left: centerX - item.width / 2 - padding, right: centerX + item.width / 2 + padding, top: centerY - item.height / 2 - padding, bottom: centerY + item.height / 2 + padding });
        }
      }

      return placed;
    }

    function drawPlaced(placed: any[], w: number, h: number) {
      if (cancelled) return;
      const svg = svgRef.current;
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const svgNS = 'http://www.w3.org/2000/svg';
      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform', `translate(${w / 2},${h / 2})`);

      // center reference is already considered in placed.x/y
      placed.forEach((wd, i) => {
        const gx = wd.x - w / 2;
        const gy = wd.y - h / 2;

        const group = document.createElementNS(svgNS, 'g');
        // do not rotate text; keep transform only for translation
        group.setAttribute('transform', `translate(${gx},${gy})`);
        group.setAttribute('style', 'transition: transform 150ms ease, opacity 300ms ease; opacity: 0; transform-box: fill-box; transform-origin: center;');

        const rectW = (wd.width || (wd.size * wd.text.length * 0.6)) + 12; // fallback estimate
        const rectH = (wd.height || wd.size) + 8;

        const rectEl = document.createElementNS(svgNS, 'rect');
        rectEl.setAttribute('x', String(-rectW / 2));
        rectEl.setAttribute('y', String(-rectH / 2));
        rectEl.setAttribute('width', String(rectW));
        rectEl.setAttribute('height', String(rectH));
        rectEl.setAttribute('rx', '10');
        // glassmorphism: semi-transparent fill + subtle stroke + drop shadow
        rectEl.setAttribute('fill', 'var(--tag-box-fill, rgba(255,255,255,0.72))');
        rectEl.setAttribute('stroke', 'var(--tag-box-stroke, rgba(0,0,0,0.06))');
        rectEl.setAttribute('stroke-width', '1');
        rectEl.setAttribute('class', 'pointer-events-none');
        rectEl.setAttribute('style', 'filter: drop-shadow(0 6px 12px rgba(0,0,0,0.06));');

        const textEl = document.createElementNS(svgNS, 'text');
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('x', '0');
        // compute y offset so measured bbox is vertically centered at y=0
        const textY = -((wd.bboxY || 0) + (wd.height || 0) / 2);
        textEl.setAttribute('y', String(textY));
        textEl.setAttribute('font-size', `${wd.size}px`);
        textEl.setAttribute('font-family', 'serif');
        textEl.setAttribute('fill', 'currentColor');
        textEl.classList.add('cursor-pointer', 'select-none');
        textEl.textContent = wd.text;

        group.appendChild(rectEl);
        group.appendChild(textEl);

        group.addEventListener('click', () => {
          window.location.href = `/tags/${encodeURIComponent(wd.text)}`;
        });
        group.addEventListener('mouseenter', () => {
          group.style.transform = `translate(${gx}px,${gy}px) scale(1.08)`;
        });
        group.addEventListener('mouseleave', () => {
          group.style.transform = `translate(${gx}px,${gy}px) scale(1)`;
        });

        g.appendChild(group);
      });

      svg.appendChild(g);

      // trigger fade-in
      requestAnimationFrame(() => {
        const groups = svg.querySelectorAll('g > g');
        groups.forEach(gr => {
          (gr as HTMLElement).style.opacity = '1';
        });
      });
    }

    function render() {
      const w = wrapperRef.current?.clientWidth || 760;
      const h = sizeRef.current.h;
      sizeRef.current = { w, h };
      const placed = measureAndPlace();
        // attempt to resolve remaining overlaps by iterative repulsion
        const resolveOverlaps = () => {
          const maxIter = 1000; // increase iterations for stronger repulsion
          let changed = false;
          for (let iter = 0; iter < maxIter; iter++) {
            changed = false;
            for (let i = 0; i < placed.length; i++) {
              for (let j = i + 1; j < placed.length; j++) {
                const a = placed[i];
                const b = placed[j];
                // compute overlap on x and y
                const overlapX = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
                const overlapY = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
                if (overlapX > 0 && overlapY > 0) {
                  // push the smaller area one away from the larger
                  const areaA = (a.right - a.left) * (a.bottom - a.top);
                  const areaB = (b.right - b.left) * (b.bottom - b.top);
                  const small = areaA <= areaB ? a : b;
                  const large = areaA <= areaB ? b : a;

                  // vector from large center to small center
                  const largeCx = (large.left + large.right) / 2;
                  const largeCy = (large.top + large.bottom) / 2;
                  const smallCx = (small.left + small.right) / 2;
                  const smallCy = (small.top + small.bottom) / 2;
                  let vx = smallCx - largeCx;
                  let vy = smallCy - largeCy;
                  const len = Math.sqrt(vx * vx + vy * vy) || 1;
                  vx /= len;
                  vy /= len;

                  // push amount proportional to overlap area, capped
                  const push = Math.min(80, Math.max(6, (overlapX + overlapY) / 2));
                  const dx = Math.round(vx * push);
                  const dy = Math.round(vy * push);

                  // apply movement to small
                  small.x = Math.max(0, Math.min(w - (small.right - small.left) - padding, small.x + dx));
                  small.y = Math.max(0, Math.min(h - (small.bottom - small.top) - padding, small.y + dy));
                  small.left = small.x - padding;
                  small.top = small.y - padding;
                  small.right = small.x + (small.right - small.left) + padding;
                  small.bottom = small.y + (small.bottom - small.top) + padding;

                  changed = true;
                }
              }
            }
            if (!changed) break;
          }
        };

        resolveOverlaps();

      drawPlaced(placed, w, h);
    }

    render();

    let ro: ResizeObserver | null = null;
    if (wrapperRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        if (cancelled) return;
        render();
      });
      ro.observe(wrapperRef.current);
    }

    return () => {
      cancelled = true;
      if (ro && wrapperRef.current) ro.unobserve(wrapperRef.current);
    };
  }, [tags, height]);

  return (
    <div ref={wrapperRef} className="mx-auto text-neutral-800 dark:text-neutral-200" style={{ width: '100%', height }}>
      <svg ref={svgRef} width="100%" height={height} />
    </div>
  );
}
