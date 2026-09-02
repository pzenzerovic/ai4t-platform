import lessonVideos from '../../data/lesson-videos.json'

// Vimeo player for lessons that have a published video — renders nothing for
// the rest, so the page is unchanged while videos roll out. Every video is
// English narration with English captions, shared across content languages.
// dnt=1 disables Vimeo's session tracking for GDPR-friendly embedding.
export default function LessonVideo({ categorySlug, lessonSlug, title }) {
  const video = lessonVideos[`${categorySlug}/${lessonSlug}`]
  if (!video) return null

  return (
    <div className="mb-8 aspect-video rounded-lg overflow-hidden border border-gray-200 bg-black">
      <iframe
        src={`${video.embedUrl}&dnt=1`}
        title={title}
        className="w-full h-full"
        allow="fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
