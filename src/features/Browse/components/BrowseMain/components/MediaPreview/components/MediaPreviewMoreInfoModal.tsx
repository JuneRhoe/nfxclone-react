import { MediaPreviewMediaInfo } from '@/features/Browse/hooks'
import Modal, { ModalProps } from '@/features/Modal/Modal'
import Image from '@/submodule/components/Image/Image'
import { useEffect } from 'react'

export interface PreviewMoreInfoModalProps
  extends Omit<ModalProps, 'children'> {
  mediaInfo: MediaPreviewMediaInfo
  fullHeight?: boolean
}

export default function MediaPreviewMoreInfoModal(
  props: PreviewMoreInfoModalProps,
) {
  useEffect(() => {
    const handleESC = () => {
      props.closeModal()
    }

    window.addEventListener('keyup', handleESC)

    return () => window.removeEventListener('keyup', handleESC)
  }, [props])

  return (
    <Modal
      {...props}
      overlayAlignItems="start"
      topMostOverlay
      hasOverlayBackground
      contentElement={(_, children) => (
        <div className="fixed inset-0 flex justify-center items-start overflow-auto">
          <div
            className="w-full mx-6 my-[2rem]"
            style={{
              height: props.fullHeight
                ? `${window.document.body.clientHeight}px`
                : 'unset',
            }}
          >
            {children}
          </div>
        </div>
      )}
    >
      <div
        className="flex justify-center h-full lg:mx-0"
        onClick={() => props.closeModal()}
      >
        <div
          className="w-full h-full lg:w-[61rem] bg-[#111111] transition-all duration-200 ease-out
            text-white rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col w-full h-full shadow-md">
            <div className="relative">
              <Image
                imgClassName="w-full rounded-t-xl"
                className="w-full"
                src={props.mediaInfo.mediaMainImg}
              />
              <div className="absolute bottom-[5%] w-[80%] px-[2%]">
                <Image src={props.mediaInfo.mediaTitleImg} />
              </div>
            </div>
            <br /> <br /> <br />
            <button onClick={() => props.closeModal()}>CLOSE</button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            MIDDDDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLE
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            ENDDDDDDDDDDDDDDDDDDDDDDDDDD
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </Modal>

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <Modal {...props} overlayAlignItems="start" topMostOverlay hasOverlayBackground>
    //   <div className="mt-[5rem] bg-amber-50">
    //     Detail Modal
    //     <br />
    //     <br />
    //     disableBodyScrollLock: false
    //     <br />
    //     overlayAlignItems="start"
    //     <br />
    //     topMostOverlay
    //     <br />
    //     hasOverlayBackground
    //     <br />
    //     <br />
    //     1 MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     2 MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     3 MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     4 MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     5 MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     6 MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     7 MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />8 MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     999999999999999999999999999999999999999
    //   </div>
    // </Modal>

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <Modal {...props}>
    //   <div className="fixed left-[200px] top-[100px] w-[500px] h-[300px] bg-amber-50">
    //     MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModal
    //   </div>
    // </Modal>

    // <Modal {...props}>
    //   <div className="bg-amber-50">
    //     MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModalMediaSliderModal
    //     <br />
    //     <br />
    //     <br />
    //     MediaSliderModalMediaSliderModal
    //   </div>
    // </Modal>
  )
}
