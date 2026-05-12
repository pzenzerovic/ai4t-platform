import { Composition } from 'remotion'
import { Lesson01, LESSON_01_DURATION_SECONDS, FPS } from './Lesson01.jsx'
import { Lesson02, LESSON_02_DURATION_SECONDS } from './Lesson02.jsx'

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Lesson01"
        component={Lesson01}
        durationInFrames={Math.ceil(LESSON_01_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={3840}
        height={2160}
      />
      <Composition
        id="Lesson02"
        component={Lesson02}
        durationInFrames={Math.ceil(LESSON_02_DURATION_SECONDS * FPS)}
        fps={FPS}
        width={3840}
        height={2160}
      />
    </>
  )
}
