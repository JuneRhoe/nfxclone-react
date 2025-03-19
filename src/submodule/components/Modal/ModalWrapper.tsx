import ReactModal from 'react-modal'
import { ModalInstanceInfo, ModalInfo } from './hooks'

export interface ModalWrapperProps extends ModalInstanceInfo {
  modalInfoArray: ModalInfo[]
  children: React.ReactNode
  overlayPosition?: 'absolute' | 'fixed'
  overlayJustifyContent?: 'start' | 'center'
  overlayAlignItems?: 'start' | 'center'
  topMostOverlay?: boolean
  disableOverlay?: boolean
  hideOverlayScroll?: boolean
  hasOverlayBackground?: boolean
  shouldCloseOnOverlayClick?: boolean
  contentElement?: (
    props: React.ComponentPropsWithRef<'div'>,
    children: React.ReactNode,
  ) => React.ReactElement
}

export default function ModalWrapper({
  modalInfoArray,
  children,
  overlayPosition = 'fixed',
  overlayJustifyContent = 'center',
  overlayAlignItems = 'center',
  topMostOverlay,
  disableOverlay,
  hideOverlayScroll,
  hasOverlayBackground,
  shouldCloseOnOverlayClick = false,
  contentElement,
  modalId,
  closeModal,
}: ModalWrapperProps) {
  const showModal = modalInfoArray.some(
    (modalInfo) => modalInfo.modalId === modalId,
  )
  const clientHeight = window.document.body.clientHeight

  return (
    <ReactModal
      isOpen={showModal}
      style={{
        overlay: {
          ...{ position: overlayPosition },
          display: 'flex',
          ...{ justifyContent: overlayJustifyContent },
          ...{ alignItems: overlayAlignItems },
          width: '100%',
          height: `${clientHeight}px`,
          inset: 0,
          backgroundColor: hasOverlayBackground
            ? 'rgb(0 0 0 / 60%)'
            : 'transparent',
          zIndex: topMostOverlay ? '100' : '30',
          overflowY: hideOverlayScroll ? 'hidden' : 'auto',
          overflowX: 'hidden',
          pointerEvents: disableOverlay ? 'none' : 'auto',
        },
        content: {
          position: 'static',
          border: 0,
          borderRadius: 0,
          padding: 0,
          margin: 0,
          inset: 0,
          outline: 'none',
          background: 'transparent',
        },
      }}
      contentElement={contentElement}
      onRequestClose={() => closeModal()}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc
      preventScroll
    >
      {children}
    </ReactModal>
  )
}
