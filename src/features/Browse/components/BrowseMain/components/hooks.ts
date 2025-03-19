import { MOCK_MEDIA_PREVIEWS } from '@/mock-data'
import { MediaInfo } from '@/mock-data-definitions'
import { useCallback, useEffect, useState } from 'react'
import {
  getPreviewMainImg,
  getPreviewTitleImg,
  getTitleImgPath,
} from './MediaPreview/utils'

const CLOSE_MODAL_DELAY = 300

export function useMediaMoreInfoModal(
  mediaInfo: MediaInfo,
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
    const timerId = setTimeout(() => setFade(true), 0)

    return () => {
      clearTimeout(timerId)
    }
  }, [modalId, closeAllModal])

  const modalLeft = !itemRect
    ? `${window.innerWidth / 2}px`
    : `${itemRect.left - 32}px`
  const modalTop = !itemRect
    ? `${window.innerHeight / 2}px`
    : `${itemRect.top - 32}px`
  const modalWidth = !itemRect ? '0' : `${itemRect.width}px`
  const modalHeight = !itemRect ? '0' : `${itemRect.height}px`

  // ToDo: test code

  const hasPreview = MOCK_MEDIA_PREVIEWS.some(({ id }) => id === mediaInfo.id)
  const previewMainImg = hasPreview
    ? getPreviewMainImg(mediaInfo.id)
    : getTitleImgPath(mediaInfo.id)
  const previewTitleImg = hasPreview ? getPreviewTitleImg(mediaInfo.id) : null

  return {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    previewMainImg,
    previewTitleImg,
    fadeModal,
  }
}
