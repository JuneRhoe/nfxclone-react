import { useEffect } from 'react'
import { useLocation } from 'react-router'

interface Props {
  behavior?: ScrollBehavior
}

export default function ScrollToTop({ behavior = 'auto' }: Props) {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior })
  }, [pathname, search, behavior])

  return null
}
