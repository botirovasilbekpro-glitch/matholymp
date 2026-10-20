import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMathSegments } from './math-parser.ts';

test('parseMathSegments handles empty and plain text', () => {
  assert.deepEqual(parseMathSegments(''), []);
  assert.deepEqual(parseMathSegments('Oddiy matn'), [
    { type: 'text', content: 'Oddiy matn' },
  ]);
});

test('parseMathSegments extracts inline math $x^2 + y^2 = z^2$', () => {
  const result = parseMathSegments('Uchburchakda $a^2 + b^2 = c^2$ o‘rinli.');
  assert.equal(result.length, 3);
  assert.equal(result[0].type, 'text');
  assert.equal(result[0].content, 'Uchburchakda ');
  assert.equal(result[1].type, 'inline-math');
  assert.equal(result[1].content, 'a^2 + b^2 = c^2');
  assert.equal(result[2].type, 'text');
  assert.equal(result[2].content, ' o‘rinli.');
});

test('parseMathSegments extracts display math $$...$$', () => {
  const result = parseMathSegments('Quyidagi tenglikni isbotlang:\n$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$\nBu formula Gaussga tegishli.');
  assert.equal(result.length, 3);
  assert.equal(result[1].type, 'display-math');
  assert.equal(result[1].content, '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}');
});
