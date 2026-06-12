import React, { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  [key: string]: any;
}

export const MDXComponents = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1
      {...props}
      className="text-4xl font-bold mb-6 mt-8 text-neutral-900 dark:text-neutral-100"
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2
      {...props}
      className="text-3xl font-bold mb-4 mt-8 text-neutral-900 dark:text-neutral-100"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3
      {...props}
      className="text-2xl font-bold mb-3 mt-6 text-neutral-900 dark:text-neutral-100"
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: HeadingProps) => (
    <p
      {...props}
      className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300"
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: HeadingProps) => (
    <ul
      {...props}
      className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: HeadingProps) => (
    <ol
      {...props}
      className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300"
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: HeadingProps) => (
    <li {...props} className="ml-4">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: HeadingProps) => (
    <blockquote
      {...props}
      className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 italic my-4 text-neutral-600 dark:text-neutral-400"
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: HeadingProps) => (
    <code
      {...props}
      className="font-mono text-sm bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200"
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: HeadingProps) => (
    <pre
      {...props}
      className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto mb-4 border border-neutral-200 dark:border-neutral-800"
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }: HeadingProps & { href: string }) => (
    <a
      href={href}
      {...props}
      className="link-subtle"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      {...props}
      className="rounded-lg my-4 max-w-full h-auto"
    />
  ),
};

export default MDXComponents;
