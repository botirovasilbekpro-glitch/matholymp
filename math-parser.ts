export interface MathSegment {
  type: 'text' | 'inline-math' | 'display-math';
  content: string;
}

/**
 * Parses mixed text containing LaTeX formulas:
 * - Display math: $$...$$ or \[...\]
 * - Inline math: $...$ or \(...\)
 * - Plain text
 */
export function parseMathSegments(rawText: string): MathSegment[] {
  if (!rawText) return [];

  const segments: MathSegment[] = [];
  let remaining = rawText;

  // Pattern matches $$...$$, \[...\], $...$, or \(...\)
  const mathRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$(?!\$)((?:\\.|[^$\\])+)\$|\\\(([\s\S]*?)\\\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(rawText)) !== null) {
    const matchStart = match.index;
    const matchEnd = mathRegex.lastIndex;

    // Push preceding text segment if any
    if (matchStart > lastIndex) {
      segments.push({
        type: 'text',
        content: rawText.slice(lastIndex, matchStart),
      });
    }

    const matchedStr = match[0];

    if (matchedStr.startsWith('$$') && matchedStr.endsWith('$$')) {
      segments.push({
        type: 'display-math',
        content: matchedStr.slice(2, -2).trim(),
      });
    } else if (matchedStr.startsWith('\\[') && matchedStr.endsWith('\\]')) {
      segments.push({
        type: 'display-math',
        content: matchedStr.slice(2, -2).trim(),
      });
    } else if (matchedStr.startsWith('$') && matchedStr.endsWith('$')) {
      segments.push({
        type: 'inline-math',
        content: matchedStr.slice(1, -1).trim(),
      });
    } else if (matchedStr.startsWith('\\(') && matchedStr.endsWith('\\)')) {
      segments.push({
        type: 'inline-math',
        content: matchedStr.slice(2, -2).trim(),
      });
    }

    lastIndex = matchEnd;
  }

  // Push remaining trailing text
  if (lastIndex < rawText.length) {
    segments.push({
      type: 'text',
      content: rawText.slice(lastIndex),
    });
  }

  return segments;
}

export interface LatexSymbolAction {
  label: string;
  latex: string;
  description: string;
  category: 'Asosiy' | 'Algebra' | 'Sonlar' | 'Geometriya';
}

export const QUICK_LATEX_SYMBOLS: LatexSymbolAction[] = [
  { label: 'a/b', latex: '\\frac{a}{b}', description: 'Kasr (Fraction)', category: 'Asosiy' },
  { label: '√x', latex: '\\sqrt{x}', description: 'Kvadrat ildiz', category: 'Asosiy' },
  { label: 'xⁿ', latex: 'x^{n}', description: 'Daraja (Power)', category: 'Asosiy' },
  { label: 'x_n', latex: 'x_{n}', description: 'Pastki indeks (Subscript)', category: 'Asosiy' },
  { label: '≤', latex: '\\le ', description: 'Kichik yoki teng', category: 'Algebra' },
  { label: '≥', latex: '\\ge ', description: 'Katta yoki teng', category: 'Algebra' },
  { label: '≠', latex: '\\ne ', description: 'Teng emas', category: 'Algebra' },
  { label: '±', latex: '\\pm ', description: 'Musbat-manfiy', category: 'Algebra' },
  { label: '∑', latex: '\\sum_{i=1}^{n} ', description: 'Yig‘indi (Summation)', category: 'Algebra' },
  { label: '∏', latex: '\\prod_{i=1}^{n} ', description: 'Ko‘paytma (Product)', category: 'Algebra' },
  { label: 'π', latex: '\\pi ', description: 'Pi soni', category: 'Asosiy' },
  { label: 'α', latex: '\\alpha ', description: 'Alfa', category: 'Algebra' },
  { label: 'β', latex: '\\beta ', description: 'Beta', category: 'Algebra' },
  { label: 'mod', latex: '\\equiv a \\pmod{m}', description: 'Taqqoslama (Mod)', category: 'Sonlar' },
  { label: 'a | b', latex: 'a \\mid b', description: 'Bo‘linish (Divides)', category: 'Sonlar' },
  { label: 'EKUB', latex: '\\gcd(a, b)', description: 'Eng katta umumiy bo‘luvchi', category: 'Sonlar' },
  { label: 'EKUK', latex: '\\operatorname{lcm}(a, b)', description: 'Eng kichik umumiy karrali', category: 'Sonlar' },
  { label: '△ABC', latex: '\\triangle ABC', description: 'Uchburchak', category: 'Geometriya' },
  { label: 'burchak', latex: '\\angle ABC', description: 'Burchak', category: 'Geometriya' },
  { label: 'perp', latex: '\\perp ', description: 'Perpendikulyar', category: 'Geometriya' },
  { label: 'paral', latex: '\\parallel ', description: 'Parallel', category: 'Geometriya' },
  { label: '=>', latex: '\\implies ', description: 'Kelib chiqadi', category: 'Asosiy' },
  { label: '<=>', latex: '\\iff ', description: 'Teng kuchli', category: 'Asosiy' },
];
