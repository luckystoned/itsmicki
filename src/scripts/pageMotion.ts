/**
 * Shared page motion for editorial pages (/projects, /deets, /side-b and the cases):
 * - parallax: each `[data-parallax]` frame gets `--parallax-progress` (0→1 while it crosses the viewport); the
 *   pages use it to drift the whole frame ±16px, so photos keep their original size and crop;
 * - load-in: `[data-appear]` elements rise and fade in as they enter the viewport;
 * - images fade in once they finish downloading.
 */
export function initPageMotion(root: HTMLElement | null) {
  if (!root) return;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.querySelectorAll<HTMLImageElement>('[data-parallax] img').forEach((image) => {
    const done = () => image.classList.add('is-loaded');
    if (image.complete) done();
    else {
      image.addEventListener('load', done, { once: true });
      image.addEventListener('error', done, { once: true });
    }
  });

  if (calm) return;

  const frames = [...root.querySelectorAll<HTMLElement>('[data-parallax]')];
  let queued = false;
  const update = () => {
    queued = false;
    const viewport = window.innerHeight;
    frames.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      frame.style.setProperty('--parallax-progress', Math.max(0, Math.min(1, progress)).toFixed(4));
    });
  };
  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();

  document.documentElement.classList.add('appear-ready');
  const appearObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    appearObserver.unobserve(entry.target);
  }), { threshold: .12 });
  root.querySelectorAll('[data-appear]').forEach((node) => appearObserver.observe(node));
}
