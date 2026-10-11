/**
 * Carousel card names that don't fit their card (long Side B labels) slide back and forth to show the whole line.
 * Marks each `[data-name-scroll]` box (holding a `[data-name-line]`) whose text overflows with `is-long` and gives it
 * how far (`--name-shift`) and how long (`--name-duration`) to travel; the CSS runs the motion. Re-measures when cards
 * or fonts change size.
 */
const SPEED = 40; // px per second

export function scrollLongNames(selector = '[data-name-scroll]') {
  const boxes = [...document.querySelectorAll<HTMLElement>(selector)];
  if (!boxes.length) return;
  const measure = (box: HTMLElement) => {
    const line = box.querySelector<HTMLElement>('[data-name-line]');
    if (!line) return;
    const overflow = line.offsetWidth - box.clientWidth;
    box.classList.toggle('is-long', overflow > 1);
    if (overflow > 1) {
      box.style.setProperty('--name-shift', `${-Math.ceil(overflow)}px`);
      box.style.setProperty('--name-duration', `${(overflow / SPEED + 2.4).toFixed(2)}s`);
    }
  };
  const all = () => boxes.forEach(measure);
  // Watch the line too: the name's font size can change while its box (capped at the card width) stays the same.
  const observer = new ResizeObserver((entries) => entries.forEach((entry) => {
    const box = (entry.target as HTMLElement).closest<HTMLElement>(selector);
    if (box) measure(box);
  }));
  boxes.forEach((box) => { observer.observe(box); const line = box.querySelector('[data-name-line]'); if (line) observer.observe(line); });
  document.fonts?.ready.then(all);
  all();
}
