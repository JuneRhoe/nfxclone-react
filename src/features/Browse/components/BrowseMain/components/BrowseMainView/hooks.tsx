import { useEffect, useRef, useState } from 'react'
import { MainViewVideoProps } from './components/BrowseMainViewVideo'
import { MainViewImageProps } from './components/BrowseMainViewImage'

const MAX_MEDIA_COUNT = 4
const PREVIEW_DELAY = 800

export interface MainViewMediaInfo {
  mediaMainImg: string
  mediaPreview: string
  mediaTitleImg: string
}

export function useMainViewMediaInfo(): MainViewMediaInfo | null {
  // Temporary generate media info instead of getting from backend due to the mockapi limitation

  const [randomIndex, setRandomIndex] = useState(-1)

  useEffect(() => {
    if (randomIndex >= 0) {
      return
    }

    setRandomIndex(Math.floor(Math.random() * MAX_MEDIA_COUNT))
  }, [randomIndex])

  return randomIndex < 0
    ? null
    : {
        mediaMainImg: `/images/browse-home/media-main-${randomIndex}.jpg`,
        mediaPreview: `/images/browse-home/media-preview-${randomIndex}.mp4`,
        mediaTitleImg: `/images/browse-home/media-title-${randomIndex}.png`,
      }
}

export function useMainViewMedia() {
  const mediaInfo = useMainViewMediaInfo()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const [isVideoStarted, setIsVideoStarted] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const videoInstance = videoRef.current

    if (!videoInstance || !mediaInfo || isVideoStarted || !isImageLoaded) {
      return
    }

    const timerId = setTimeout(() => {
      videoInstance.play()
    }, PREVIEW_DELAY)

    return () => {
      clearTimeout(timerId)
    }
  }, [isImageLoaded, isVideoStarted, mediaInfo])

  useEffect(() => {
    const videoInstance = videoRef.current

    if (!videoInstance || !isVideoStarted || isVideoEnded || !mediaInfo) {
      return
    }

    if (isVideoVisible) {
      videoInstance.play()
    } else {
      videoInstance.pause()
    }
  }, [isVideoEnded, isVideoStarted, isVideoVisible, mediaInfo])

  const mainViewVideoProps: MainViewVideoProps = {
    videoRef,
    mediaInfo,
    isVideoStarted,
    isVideoEnded,
    onVideoStarted: setIsVideoStarted,
    onVideoEnded: setIsVideoEnded,
    onVideoVisible: setIsVideoVisible,
  }

  const mainViewImageProps: MainViewImageProps = {
    mediaInfo,
    isVideoStarted,
    isVideoEnded,
    onImageLoaded: setIsImageLoaded,
  }

  return {
    mainViewImageProps,
    mainViewVideoProps,
  }
}
