import { useEffect, useRef, useState } from 'react'
import { MediaPreviewVideoProps } from './components/MediaPreviewVideo'
import { MediaPreviewImageProps } from './components/MediaPreviewImage'

const MAX_MEDIA_COUNT = 4
const PREVIEW_DELAY = 800

export interface MediaPreviewMediaInfo {
  mediaMainImg: string
  mediaPreview: string
  mediaTitleImg: string
}

export function useMediaPreviewMediaInfo(): MediaPreviewMediaInfo | null {
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
        mediaMainImg: `/images/browse-home/media-preview/media-main-${randomIndex}.jpg`,
        mediaPreview: `/images/browse-home/media-preview/media-preview-${randomIndex}.mp4`,
        mediaTitleImg: `/images/browse-home/media-preview/media-title-${randomIndex}.png`,
      }
}

export function useMediaPreviewMedia() {
  const mediaInfo = useMediaPreviewMediaInfo()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  const [isVideoCanPlay, setIsVideoCanPlay] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)

  const [isSetAutoPlay] = useState(true)
  const [isAutoPlayed, setIsAutoPlayed] = useState(false)

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const videoInstance = videoRef.current

    if (
      !videoInstance ||
      !mediaInfo ||
      !isVideoCanPlay ||
      !isImageLoaded ||
      isVideoPlaying ||
      !isSetAutoPlay ||
      isAutoPlayed
    ) {
      return
    }

    const timerId = setTimeout(() => {
      setIsAutoPlayed(true)
      videoInstance.play()
    }, PREVIEW_DELAY)

    return () => {
      clearTimeout(timerId)
    }
  }, [
    isImageLoaded,
    isVideoPlaying,
    mediaInfo,
    isVideoCanPlay,
    isSetAutoPlay,
    isAutoPlayed,
  ])

  useEffect(() => {
    const videoInstance = videoRef.current

    if (!videoInstance || !isVideoPlaying || isVideoEnded || !mediaInfo) {
      return
    }

    if (isVideoVisible) {
      videoInstance.play()
    } else {
      videoInstance.pause()
    }
  }, [isVideoEnded, isVideoPlaying, isVideoVisible, mediaInfo])

  const mediaPreviewVideoProps: MediaPreviewVideoProps = {
    videoRef,
    mediaInfo,
    isSetAutoPlay,
    isAutoPlayed,
    isVideoCanPlay,
    isVideoPlaying,
    isVideoEnded,
    onVideoCanPlay: setIsVideoCanPlay,
    onVideoPlaying: setIsVideoPlaying,
    onVideoEnded: setIsVideoEnded,
    onVideoVisible: setIsVideoVisible,
  }

  const mediaPreviewImageProps: MediaPreviewImageProps = {
    mediaInfo,
    isVideoPlaying,
    isVideoEnded,
    onImageLoaded: setIsImageLoaded,
  }

  return {
    mediaPreviewImageProps,
    mediaPreviewVideoProps,
  }
}
