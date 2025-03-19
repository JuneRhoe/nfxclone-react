import Modal, { ModalProps } from '@/features/Modal/Modal'
import { MediaInfo } from '@/mock-data-definitions'
import { useMediaMoreInfoModal } from '../hooks'
import MediaMoreInfoModalTop from './components/MediaMoreInfoModalTop'
import MediaMoreInfoModalBottom from './components/MediaMoreInfoModalBottom'

export interface PreviewMoreInfoModalProps
  extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaInfo
  fullHeight?: boolean
  itemRect?: DOMRect | null | undefined
}

export default function MediaMoreInfoModal(props: PreviewMoreInfoModalProps) {
  const {
    mediaInfo,
    fullHeight,
    itemRect,
    modalId,
    closeModal,
    closeAllModal,
  } = props

  const {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    previewMainImg,
    previewTitleImg,
    fadeModal,
  } = useMediaMoreInfoModal(
    mediaInfo,
    itemRect,
    modalId,
    closeModal,
    closeAllModal,
  )

  if (!mediaInfo) {
    return null
  }

  return (
    <Modal
      {...props}
      overlayAlignItems="start"
      topMostOverlay
      hasOverlayBackground
      contentElement={(_, children) => (
        <div className="fixed inset-0 flex justify-center items-start overflow-y-auto overflow-x-hidden">
          <div
            className="w-full mx-6 my-[2rem]"
            style={{
              height: fullHeight
                ? `${window.document.body.clientHeight}px`
                : 'unset',
              maxWidth: fade ? '64rem' : 'unset',
            }}
          >
            {children}
          </div>
        </div>
      )}
    >
      <div className="flex h-full lg:mx-0">
        <div
          className="relative w-full h-full bg-[#111111] text-white rounded-xl transition-all
            duration-300 ease-out"
          style={{
            left: fade ? '0px' : modalLeft,
            top: fade ? '0px' : modalTop,
            width: fade ? '100%' : modalWidth,
            height: fade ? '100%' : modalHeight,
            opacity: fade ? '100%' : '0',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col w-full h-full shadow-md">
            <MediaMoreInfoModalTop
              mediaInfo={mediaInfo}
              previewMainImg={previewMainImg}
              previewTitleImg={previewTitleImg}
              fade={fade}
              fadeModal={fadeModal}
            />
            {fade && <MediaMoreInfoModalBottom mediaInfo={mediaInfo} />}
          </div>
        </div>
      </div>
    </Modal>
  )
}
