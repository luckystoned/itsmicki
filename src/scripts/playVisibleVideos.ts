/**
 * Muted, looping videos served from the site (carousel covers and case media): each one loads and plays only while it
 * is on screen, so the repeated loops of the infinite carousels never decode several copies at once. With reduced
 * motion they never play and the still frame under them (or their poster) stays visible.
 */
export const playVisibleVideos = (root: ParentNode, reduceMotion: boolean) => {
  const videos = [...root.querySelectorAll<HTMLVideoElement>('video[data-autoplay-video]')];
  if (reduceMotion || !videos.length) return;
  const onScreen = new Set<HTMLVideoElement>();
  const play = (video: HTMLVideoElement) => video.play().catch(() => {});
  const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
    const video = target as HTMLVideoElement;
    if (isIntersecting) {
      onScreen.add(video);
      video.preload = 'auto';
      play(video);
    } else {
      onScreen.delete(video);
      video.pause();
    }
  }), { rootMargin: '25%' });
  videos.forEach((video) => observer.observe(video));
  // A page opened in a background tab may refuse to play; start again once it is shown.
  document.addEventListener('visibilitychange', () => { if (!document.hidden) onScreen.forEach(play); });
};
