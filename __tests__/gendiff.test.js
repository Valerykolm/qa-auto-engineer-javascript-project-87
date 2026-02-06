// __tests__/gendiff.test.js
import genDiff from '../src/index.js';

test('genDiff returns a string', () => {
  const result = genDiff();
  expect(typeof result).toBe('string');
});
