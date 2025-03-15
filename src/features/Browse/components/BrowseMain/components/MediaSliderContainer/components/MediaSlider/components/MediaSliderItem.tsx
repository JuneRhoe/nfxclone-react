import { useRef, useState } from 'react'
import SliderItem from '@/submodule/components/Slider/components/SliderItem'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock-data-definitions'
import Loader from '@/submodule/components/Loader/Loader'
import { getTitleImgPath } from '../utils'
import MediaSliderItemModal from './MediaSliderItemModal'
import { useModal } from '@/features/Modal/hooks'

interface Props {
  mediaInfo: MediaInfo
  itemSize: number
  isSliding: boolean
}

const OPEN_MODAL_DELAY = 650

export default function MediaSliderItem({
  mediaInfo,
  itemSize,
  isSliding,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()

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
          onPointerEnter={() => {
            if (isSliding) {
              return
            }

            setTimerId(
              setTimeout(() => {
                modalInstanceInfo.openModal()
                modalInstanceInfo.closeAllModal([
                  modalInstanceInfo.modalId || '',
                ])
              }, OPEN_MODAL_DELAY),
            )
          }}
          onPointerLeave={() => clearTimeout(timerId)}
        >
          <div>
            <Image
              imgClassName="rounded-sm"
              src={getTitleImgPath(mediaInfo.id)}
            >
              <div className="w-full h-full rounded-sm">
                <Loader className="opacity-50" display="inline" />
              </div>
            </Image>
          </div>
        </div>
      </SliderItem>

      {isVisible && (
        <MediaSliderItemModal
          mediaInfo={mediaInfo}
          itemRect={itemRect}
          {...modalInstanceInfo}
        />
      )}
    </>
  )
}
