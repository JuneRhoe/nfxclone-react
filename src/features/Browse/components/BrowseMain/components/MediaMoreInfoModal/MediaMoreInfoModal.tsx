import Modal, { ModalProps } from '@/features/Modal/Modal'
import { MediaInfo } from '@/mock/mock-data-definitions'
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
        <div
          className="fixed inset-0 flex items-start justify-center overflow-x-hidden overflow-y-auto"
          onClick={() => props.closeModal()}
        >
          <div
            className="mx-6 my-[2rem] w-full"
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
          className="relative h-full w-full rounded-xl bg-[#111111] text-white transition-all
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
          <div className="flex h-full w-full flex-col shadow-md">
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
