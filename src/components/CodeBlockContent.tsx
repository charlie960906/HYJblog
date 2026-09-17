'use client';

import { useEffect, useRef } from 'react';

interface CodeBlockContentProps {
  html: string;
}

export default function CodeBlockContent({ html }: CodeBlockContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleCopy = async (event: Event) => {
      const target = event.target as HTMLElement;
      const copyButton = target.closest<HTMLButtonElement>('[data-code-copy]');
      const spoilerButton = target.closest<HTMLButtonElement>('[data-spoiler]');

      if (spoilerButton) {
        const isRevealed = spoilerButton.getAttribute('aria-expanded') === 'true';
        spoilerButton.setAttribute('aria-expanded', String(!isRevealed));
        spoilerButton.classList.toggle('is-revealed', !isRevealed);
        return;
      }

      if (!copyButton) return;

      const code = copyButton.parentElement?.querySelector('code')?.textContent ?? '';
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      copyButton.textContent = '已複製';
      window.setTimeout(() => {
        copyButton.textContent = '複製';
      }, 1600);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const spoilerButton = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-spoiler]');
      if (!spoilerButton) return;
      event.preventDefault();
      spoilerButton.click();
    };

    container.addEventListener('click', handleCopy);
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('click', handleCopy);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="prose-custom space-y-4 text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-full overflow-x-hidden break-words overflow-wrap-anywhere"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}