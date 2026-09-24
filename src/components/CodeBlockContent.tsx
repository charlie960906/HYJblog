'use client';

import { useLanguage } from '@/app/providers';
import { useEffect, useRef } from 'react';

interface CodeBlockContentProps {
  html: string;
}

function updateCodeButtonState(button: HTMLButtonElement, isEnglish: boolean, state: 'a' | 'b') {
  const copyText = button.querySelector('[data-icon="a"]');
  const copiedText = button.querySelector('[data-icon="b"]');
  const copyLabel = isEnglish ? 'Copy code' : '複製程式碼';
  const copiedLabel = isEnglish ? 'Copied code' : '已複製程式碼';

  if (copyText) {
    copyText.textContent = isEnglish ? 'Copy' : '複製';
  }

  if (copiedText) {
    copiedText.textContent = isEnglish ? 'Copied' : '已複製';
  }

  button.dataset.state = state;
  button.setAttribute('aria-label', state === 'b' ? copiedLabel : copyLabel);
}

export default function CodeBlockContent({ html }: CodeBlockContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll<HTMLButtonElement>('[data-code-copy]');
    buttons.forEach((button) => {
      const nextState = button.dataset.state === 'b' ? 'b' : 'a';
      updateCodeButtonState(button, isEnglish, nextState);
    });

    const videos = container.querySelectorAll<HTMLVideoElement>('video[preload="none"]');
    const videoObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const video = entry.target as HTMLVideoElement;
            video.preload = 'metadata';
            observer.unobserve(video);
          });
        }, { rootMargin: '200px 0px' })
      : null;

    videos.forEach((video) => {
      if (videoObserver) {
        videoObserver.observe(video);
      } else {
        video.preload = 'metadata';
      }
    });

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
      updateCodeButtonState(copyButton, language === 'en', 'b');
      window.setTimeout(() => {
        updateCodeButtonState(copyButton, language === 'en', 'a');
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
      videoObserver?.disconnect();
      container.removeEventListener('click', handleCopy);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnglish]);

  return (
    <div
      ref={containerRef}
      className="prose-custom space-y-4 text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-full overflow-x-hidden break-words overflow-wrap-anywhere"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
