export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null;

  const debounced = ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  }) as ((...args: Parameters<T>) => void) & { cancel: () => void };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debounced;
}
