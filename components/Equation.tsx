import katex from 'katex';

/**
 * Renders a LaTeX equation with KaTeX. Server- and client-safe.
 */
export default function Equation({
  tex,
  display = true,
  className = '',
}: {
  tex: string;
  display?: boolean;
  className?: string;
}) {
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    output: 'html',
  });

  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
