import { useCallback, useEffect, useRef, useState } from 'react'
import { MediaPreviewVideoProps } from './components/MediaPreviewVideo'
import { MediaPreviewImageProps } from './components/MediaPreviewImage'
import { MediaInfo } from '@/mock-data-definitions'
import { MOCK_MEDIA_PREVIEWS } from '@/mock-data'
import {
  getPreviewMainImg,
  getPreviewTitleImg,
  getPreviewTrailerImg,
} from './utils'

const PREVIEW_DELAY = 800
const CLOSE_MODAL_DELAY = 300

export function useMediaPreviewMediaInfo(): MediaInfo | null {
  // Temporary generate media info instead of getting from backend due to the mockapi limitation

  const [randomIndex, setRandomIndex] = useState(-1)

  useEffect(() => {
    if (randomIndex >= 0) {
      return
    }

    setRandomIndex(Math.floor(Math.random() * MOCK_MEDIA_PREVIEWS.length))
  }, [randomIndex])

  const previewMedia =
    randomIndex >= 0 ? MOCK_MEDIA_PREVIEWS[randomIndex] : null

  return !previewMedia
    ? null
    : {
        ...previewMedia,
        previewMainImg: getPreviewMainImg(previewMedia.id),
        previewTitleImg: getPreviewTitleImg(previewMedia.id),
        previewTrailer: getPreviewTrailerImg(previewMedia.id),
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

export function useMediaPreviewMoreInfoModal(
  itemRect: DOMRect | null | undefined,
  modalId: string | undefined,
  closeModal: () => void,
  closeAllModal: (exceptIds?: string[]) => void,
) {
  const [fade, setFade] = useState(false)

  const fadeModal = useCallback(() => {
    setFade(false)
    setTimeout(() => closeModal(), CLOSE_MODAL_DELAY)
  }, [closeModal])

  useEffect(() => {
    const handleESC = () => {
      fadeModal()
    }

    window.addEventListener('keyup', handleESC)

    return () => window.removeEventListener('keyup', handleESC)
  }, [closeModal, fadeModal])

  useEffect(() => {
    // closeAllModal([modalId || ''])
    const timerId = setTimeout(() => setFade(true), 0)

    return () => {
      clearTimeout(timerId)
    }
  }, [modalId, closeAllModal])

  const modalLeft = !itemRect
    ? `${window.innerWidth / 2}px`
    : `${itemRect.left}px`
  const modalTop = !itemRect
    ? `${window.innerHeight / 2}px`
    : `${itemRect.top}px`
  const modalWidth = !itemRect ? '0' : `${itemRect.width}px`
  const modalHeight = !itemRect ? '0' : `${itemRect.height}px`

  return {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    fadeModal,
  }
}
