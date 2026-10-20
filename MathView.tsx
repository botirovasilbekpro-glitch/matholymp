import React, { useMemo } from 'react';
import katex from 'katex';
import { parseMathSegments, MathSegment } from '../lib/math-parser.ts';

interface MathViewProps {
  content: string;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ content, className = '' }) => {
  const segments = useMemo(() => parseMathSegments(content), [content]);

  return (
    <div className={`leading-relaxed text-gray-100 ${className}`}>
      {segments.map((seg: MathSegment, idx: number) => {
        if (seg.type === 'text') {
          // Preserve newlines
          return (
            <span key={idx} className="whitespace-pre-wrap">
              {seg.content}
            </span>
          );
        }

        const isDisplay = seg.type === 'display-math';

        try {
          const html = katex.renderToString(seg.content, {
            displayMode: isDisplay,
            throwOnError: false,
            output: 'htmlAndMathml',
          });

          if (isDisplay) {
            return (
              <div
                key={idx}
                className="my-3 py-2 px-3 bg-[#130728]/80 border border-[#3B1D63] rounded-lg overflow-x-auto text-purple-200 text-center shadow-inner"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          }

          return (
            <span
              key={idx}
              className="inline-block px-1 text-purple-200 font-medium"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } catch {
          return (
            <code key={idx} className="bg-purple-950/60 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {seg.content}
            </code>
          );
        }
      })}
    </div>
  );
};
