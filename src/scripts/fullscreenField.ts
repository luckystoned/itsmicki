/**
 * Immersive fields (camera pieces on the case pages) open full screen while the camera is on. `open()` moves the field
 * to the end of the page (out of any transformed parent), lays it over everything with a cross to close it and a status
 * line at the bottom; `close()` puts it back where it was. The cross and Esc call `onClose` (which turns the camera off
 * and then calls `close()`). `controls` are extra buttons of the field shown only while it is open (Nostalgia's sound).
 */
export function fullscreenField(root: HTMLElement, { onClose, controls = [] }: { onClose: () => void; controls?: HTMLElement[] }) {
  const cross = document.createElement('button');
  cross.type = 'button';
  cross.className = 'field-full-close';
  cross.setAttribute('aria-label', 'Close: turn the camera off');
  cross.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>';
  cross.hidden = true;
  const status = document.createElement('p');
  status.className = 'field-full-status';
  status.setAttribute('aria-hidden', 'true'); // (the caption's status already speaks)
  status.hidden = true;
  root.append(cross, status);
  const home = document.createComment('field');
  const role = root.getAttribute('role');
  let opener: HTMLElement | null = null;
  const isOpen = () => root.classList.contains('is-full');
  const show = (on: boolean) => { cross.hidden = !on; status.hidden = !on; controls.forEach((c) => { c.hidden = !on; }); };
  const open = () => {
    if (isOpen()) return;
    opener = document.activeElement as HTMLElement | null;
    root.before(home); document.body.append(root);
    root.classList.add('is-full'); document.documentElement.classList.add('field-full-open');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
    show(true);
    cross.focus();
  };
  const close = () => {
    if (!isOpen()) return;
    root.classList.remove('is-full'); document.documentElement.classList.remove('field-full-open');
    if (role) root.setAttribute('role', role); else root.removeAttribute('role');
    root.removeAttribute('aria-modal');
    home.replaceWith(root);
    show(false);
    opener?.focus();
  };
  cross.addEventListener('click', onClose);
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && isOpen()) onClose(); });
  return {
    open,
    close,
    isOpen,
    setStatus: (text: string) => { if (status.textContent !== text) status.textContent = text; },
  };
}
