import { useEffect, useState } from 'react'
import Slider from '@/submodule/components/Slider/Slider'
import SliderItemContainer from '@/submodule/components/Slider/components/SliderItemContainer'
import { MediaInfo } from '@/mock-data-definitions'
import MediaSliderNavigator from './components/MediaSliderNavigator'
import MediaSliderNavButton from './components/MediaSliderNavButton'
import MediaSliderItem from './components/MediaSliderItem'
import { PageInfo, useSlider } from '@/submodule/components/Slider/hooks'
import { useMediaSlider, useMediaSliderItemSizeInfo } from './hooks'
import { useModal } from '@/features/Modal/hooks'
import MediaMoreInfoModal from '../../../MediaMoreInfoModal/MediaMoreInfoModal'

interface Props {
  medias: MediaInfo[] | null
  title?: string
  onUpdatePageInfo?: (pageInfo: PageInfo) => void
}

interface MoreInfoModalInfo {
  mediaInfo: MediaInfo
  itemRect: DOMRect | null | undefined
}

export default function MediaSlider({
  medias,
  title,
  onUpdatePageInfo,
}: Props) {
  const [isSliding, setIsSliding] = useState(false)
  const [moreInfoModalInfo, setMoreInfoModalInfo] =
    useState<MoreInfoModalInfo | null>(null)

  const { countPerPage, itemSize } = useMediaSliderItemSizeInfo()
  const {
    navInfo,
    pageInfo,
    disableTransition,
    setNavInfo,
    setPageInfo,
    setDiableTransition,
  } = useSlider<MediaInfo, MediaInfo[]>(medias, countPerPage, itemSize)
  const { displayItems, paddingClass } = useMediaSlider(pageInfo, medias)

  useEffect(() => {
    if (title || !onUpdatePageInfo) {
      return
    }

    onUpdatePageInfo(pageInfo)
  }, [title, pageInfo, onUpdatePageInfo])

  const {
    modalInstanceInfo: moreInfoModal,
    isVisible: isMoreInfoModalVisible,
  } = useModal({
    disableBodyScrollLock: false,
  })

  if (!medias || medias.length < 1 || itemSize < 1 || countPerPage < 1) {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {title && (
          <div className={paddingClass}>
            <div className="flex w-full justify-between items-center">
              <div className="text-base sm:text-xl">{title}</div>
              <MediaSliderNavigator pageInfo={pageInfo} />
            </div>
          </div>
        )}

        <Slider
          className={paddingClass}
          itemSize={itemSize}
          navInfo={navInfo}
          pageInfo={pageInfo}
          disableTransition={disableTransition}
          setNavInfo={setNavInfo}
          setPageInfo={setPageInfo}
          setDiableTransition={setDiableTransition}
        >
          {(sliderInfo) => {
            const pageInfo = sliderInfo.pageInfo
            const showPrevButton =
              pageInfo.prevIndexItems.length / pageInfo.countPerPage > 2
            const showNextButton =
              pageInfo.prevIndexItems.length / pageInfo.countPerPage > 1

            return (
              <>
                <MediaSliderNavButton
                  direction="Prev"
                  disabled={!showPrevButton}
                  pageInfo={sliderInfo.pageInfo}
                  setNavInfo={sliderInfo.setNavInfo}
                  setDiableTransition={sliderInfo.setDiableTransition}
                  onClick={() => setIsSliding(true)}
                />

                <SliderItemContainer
                  {...sliderInfo}
                  onTransitionEnd={() => {
                    setIsSliding(false)
                  }}
                >
                  {displayItems.map((item, i) => (
                    <MediaSliderItem
                      key={i}
                      mediaInfo={item}
                      itemSize={itemSize}
                      isSliding={isSliding}
                      onShowMoreInfoModal={(mediaInfo, itemRect) => {
                        setMoreInfoModalInfo({ mediaInfo, itemRect })
                        moreInfoModal.closeAllModal()
                        moreInfoModal.openModal()
                      }}
                    />
                  ))}
                </SliderItemContainer>

                <MediaSliderNavButton
                  direction="Next"
                  disabled={!showNextButton}
                  pageInfo={sliderInfo.pageInfo}
                  setNavInfo={sliderInfo.setNavInfo}
                  setDiableTransition={sliderInfo.setDiableTransition}
                  onClick={() => {
                    setIsSliding(true)
                  }}
                />
              </>
            )
          }}
        </Slider>
      </div>
      {isMoreInfoModalVisible && moreInfoModalInfo && (
        <MediaMoreInfoModal
          {...moreInfoModal}
          mediaInfo={moreInfoModalInfo.mediaInfo}
          itemRect={moreInfoModalInfo.itemRect}
        />
      )}
    </>
  )
}
