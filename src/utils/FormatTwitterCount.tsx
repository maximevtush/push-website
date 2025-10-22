export function formatTwitterCount(num: number): string {
  if (num === null || num === undefined) return '';
  if (num < 1000) return num.toString();
  if (num < 1_000_000)
    return (num / 1000).toFixed(num % 1000 >= 100 ? 1 : 0) + 'K';
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(num % 1_000_000 >= 100_000 ? 1 : 0) + 'M';
  return (
    (num / 1_000_000_000).toFixed(num % 1_000_000_000 >= 100_000_000 ? 1 : 0) +
    'B'
  );
}
