// Easing functions + helpers ported from the Claude design handoff
// (animations.jsx). Pure functions — no React deps.

export const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))

export const Easing = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => 1 - (1 - t) * (1 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutQuart: t => 1 - Math.pow(1 - t, 4),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeOutSine: t => Math.sin((t * Math.PI) / 2),
  easeOutBack: t => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
}

// Read local time (seconds since the surrounding Sequence's start)
// inside a Remotion Sequence. Returns 0 if called outside a Sequence.
export const useLocalSeconds = (frame, fps) => frame / fps
