import { cn } from '../styles';

describe('cn function', () => {
  test('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  test('handles conditional class names', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    expect(cn('foo', { bar: false, baz: true })).toBe('foo baz');
  });

  test('resolves Tailwind CSS conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('text-sm font-bold', 'font-normal')).toBe('text-sm font-normal');
  });

  test('handles array inputs', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  test('handles falsy values', () => {
    expect(cn('foo', null, undefined, false, 'bar')).toBe('foo bar');
  });

  test('returns an empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});
