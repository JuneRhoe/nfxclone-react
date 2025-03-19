import { useRef, useState } from 'react'
import SliderItem from '@/submodule/components/Slider/components/SliderItem'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock-data-definitions'
import Loader from '@/submodule/components/Loader/Loader'
import { useModal } from '@/features/Modal/hooks'
import MediaSliderItemModal from './MediaSliderItemModal/MediaSliderItemModal'
import { getTitleImgPath } from '../../../../MediaPreview/utils'
import { TouchPos } from '../utils'

interface Props {
  mediaInfo: MediaInfo
  itemSize: number
  isSliding: boolean
  onShowMoreInfoModal: (
    mediaInfo: MediaInfo,
    itemRect: DOMRect | null | undefined,
  ) => void
}

const OPEN_MODAL_POINTER_DELAY = 500
const OPEN_MODAL_TOUCH_DELAY = 100

export default function MediaSliderItem({
  mediaInfo,
  itemSize,
  isSliding,
  onShowMoreInfoModal,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [touchPos, setTouchPos] = useState<TouchPos | null>(null)

  const { modalInstanceInfo, isVisible } = useModal({
    disableBodyScrollLock: true,
  })

  const itemRect = divRef.current?.getBoundingClientRect()

  return (
    <>
      <SliderItem className="aspect-9/5 pr-1" style={{ width: `${itemSize}%` }}>
        <div
          ref={divRef}
          className="w-full h-full relative"
          onTouchStart={(e) =>
            setTouchPos({
              clientX: Math.floor(e.touches[0].clientX),
              clientY: Math.floor(e.touches[0].clientY),
            })
          }
          onTouchEnd={(e) => {
            setTouchPos(null)

            const clientX = Math.floor(e.changedTouches[0].clientX)
            const clientY = Math.floor(e.changedTouches[0].clientY)

            if (
              touchPos?.clientX !== clientX ||
              touchPos?.clientY !== clientY
            ) {
              return
            }

            if (isSliding) {
              return
            }

            setTimerId(
              setTimeout(() => {
                modalInstanceInfo.openModal()
                modalInstanceInfo.closeAllModal([
                  modalInstanceInfo.modalId || '',
                ])
              }, OPEN_MODAL_TOUCH_DELAY),
            )
          }}
          onPointerEnter={(e) => {
            if (isSliding || e.pointerType === 'touch') {
              return
            }

            setTimerId(
              setTimeout(() => {
                modalInstanceInfo.openModal()
                modalInstanceInfo.closeAllModal([
                  modalInstanceInfo.modalId || '',
                ])
              }, OPEN_MODAL_POINTER_DELAY),
            )
          }}
          onPointerLeave={() => clearTimeout(timerId)}
        >
          <Image
            imgClassName="rounded-sm"
            src={getTitleImgPath(mediaInfo.id)}
            loader={
              <Loader
                className="opacity-50"
                style={{ paddingTop: `${(itemRect?.height || 0) / 2}px` }}
                display="inline"
              />
            }
            fullHeight={false}
            fullWidth
          />
        </div>
      </SliderItem>

      {isVisible && (
        <MediaSliderItemModal
          mediaInfo={mediaInfo}
          itemRect={itemRect}
          onShowMoreInfoModal={() => onShowMoreInfoModal(mediaInfo, itemRect)}
          {...modalInstanceInfo}
        />
      )}
    </>
  )
}
