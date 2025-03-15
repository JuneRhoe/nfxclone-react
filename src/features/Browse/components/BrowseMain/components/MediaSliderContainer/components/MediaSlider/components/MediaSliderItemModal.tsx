import Modal, { ModalProps } from '@/features/Modal/Modal'
import { MediaInfo } from '@/mock-data-definitions'
import Image from '@/submodule/components/Image/Image'
import { getTitleImgPath } from '../utils'
import { useMediaSliderItemModal } from '../hooks'

export interface SliderItemModalProps extends Omit<ModalProps, 'children'> {
  children?: React.ReactNode
  mediaInfo: MediaInfo | undefined
  itemRect: DOMRect | null | undefined
}

export default function MediaSliderItemModal(props: SliderItemModalProps) {
  const {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    setPointerLeave,
  } = useMediaSliderItemModal(
    props.itemRect,
    props.closeModal,
    props.closeAllModal,
  )

  const mediaInfo = props.mediaInfo
  const itemRect = props.itemRect

  if (!mediaInfo || !itemRect) {
    return null
  }

  return (
    <Modal
      {...props}
      disableOverlay
      hideOverlayScroll
      overlayPosition="absolute"
      contentElement={(_, children) => (
        <div className="pointer-events-auto">{children}</div>
      )}
    >
      <div
        className={`absolute overflow-hidden rounded-md shadow-2xl bg-[#212121] transition-all
          duration-200 ease-out`}
        style={{
          left: fade ? `${modalLeft}px` : `${itemRect.left}px`,
          top: fade ? `${modalTop}px` : `${itemRect.top + window.scrollY}px`,
          width: fade ? `${modalWidth}px` : `${itemRect.width}px`,
          height: fade ? `${modalHeight}px` : `${itemRect.height}px`,
          opacity: fade ? '100' : '50',
          cursor: fade ? 'auto' : 'pointer',
        }}
        onTransitionEnd={(e) => e.stopPropagation()}
        onPointerLeave={() => setPointerLeave(true)}
      >
        <div className="flex flex-col w-full h-full">
          <div>
            <Image imgClassName="w-full" src={getTitleImgPath(mediaInfo.id)} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
