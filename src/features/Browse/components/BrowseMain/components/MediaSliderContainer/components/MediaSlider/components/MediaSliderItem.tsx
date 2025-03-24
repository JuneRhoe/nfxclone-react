import { useRef } from 'react'
import SliderItem from '@/submodule/components/Slider/components/SliderItem'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock/mock-data-definitions'
import Loader from '@/submodule/components/Loader/Loader'
import { useModal } from '@/features/Modal/hooks'
import MediaSliderItemModal from './MediaSliderItemModal/MediaSliderItemModal'
import { getTitleImgPath } from '../../../../MediaPreview/utils'
import { useMediaSliderItem } from '../hooks'

interface Props {
  mediaInfo: MediaInfo
  itemSize: number
  isSliding: boolean
  onShowMoreInfoModal: (
    mediaInfo: MediaInfo,
    itemRect: DOMRect | null | undefined,
  ) => void
}

export default function MediaSliderItem({
  mediaInfo,
  itemSize,
  isSliding,
  onShowMoreInfoModal,
}: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  const { modalInstanceInfo, isVisible } = useModal({
    disableBodyScrollLock: true,
  })

  const { onTouchStart, onTouchEnd, onPointerEnter, onPointerLeave } =
    useMediaSliderItem(isSliding, modalInstanceInfo)

  const itemRect = divRef.current?.getBoundingClientRect()

  return (
    <>
      <SliderItem className="aspect-9/5 pr-1" style={{ width: `${itemSize}%` }}>
        <div
          ref={divRef}
          className="w-full h-full relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
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
