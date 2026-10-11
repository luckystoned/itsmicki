/**
 * Camera input for the interactive case frames. MediaPipe Tasks Vision is loaded only when someone turns a camera on
 * (once per page, shared by every frame), and runs in the browser: the camera image never leaves the device.
 */
const VERSION = '0.10.14';
const BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Vision = any;
let vision: Promise<{ module: Vision; files: unknown }> | null = null;

export const loadVision = () => {
  vision ??= (async () => {
    const module = await import(/* @vite-ignore */ `${BASE}/vision_bundle.mjs`);
    const files = await module.FilesetResolver.forVisionTasks(`${BASE}/wasm`);
    return { module, files };
  })();
  return vision;
};

/** Front camera, small: enough for tracking and light on the device. */
export const openCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.srcObject = stream;
  await video.play();
  return { stream, video, stop: () => stream.getTracks().forEach((track) => track.stop()) };
};
