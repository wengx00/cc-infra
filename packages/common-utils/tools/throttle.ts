export default function throttle(fn: (...args: any[]) => any, throttleMs = 500) {
  let timer: any = null;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
      }, throttleMs);
      return;
    }
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
    }, throttleMs);
  };
}
