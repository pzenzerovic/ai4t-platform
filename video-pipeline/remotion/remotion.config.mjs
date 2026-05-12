import { Config } from '@remotion/cli/config'

// Reference-quality rendering for YouTube upload sources.
//
//   - Composition is now native 4K (3840×2160) — scene coordinates use the
//     1920×1080 design canvas via CSS `zoom: 2` (see Lesson01.jsx). Output
//     resolution is the true working resolution, no downsampling.
//   - PNG frame format → lossless input to FFmpeg (no JPEG artefacts).
//   - CRF 14 → "visually transparent" H.264 (default 28; lower = better).
//   - yuv420p pixel format → required by YouTube ingestion.
//   - Concurrency 2 → balances render speed with system load.
Config.setVideoImageFormat('png')
Config.setOverwriteOutput(true)
Config.setConcurrency(2)
Config.setCrf(14)
Config.setPixelFormat('yuv420p')
