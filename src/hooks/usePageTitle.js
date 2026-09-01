import { useEffect } from 'react'

const SITE_NAME = 'AI4Teachers'

// Sets document.title for the current route.
//
// In a single-page app the browser never reloads, so without this every route
// keeps the title it was served with — the tab, the history and the bookmark all
// read "AI4Teachers" no matter where you are. Screen readers announce the title
// on navigation, so this is also how a non-visual user learns that the page
// changed at all (AIT-16, finding 2 / WCAG 2.4.2).
//
// Pass null or an empty string on the homepage to get the bare site name.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  }, [title])
}
