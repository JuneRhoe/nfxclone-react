import { useMediaSlider, useMediaSliderItemSizeInfo } from '../../hooks'
import Slider from '@/submodule/components/Slider/Slider'
import SliderItemContainer from '@/submodule/components/Slider/components/SliderItemContainer'
import { MediaInfo } from '@/mock-data-definitions'
import MediaSliderNavigator from './components/MediaSliderNavigator'
import MediaSliderNavButton from './components/MediaSliderNavButton'
import MediaSliderItem from './components/MediaSliderItem'

interface Props {
  title: string
  medias: MediaInfo[] | null
}

export default function MediaSlider({ title, medias }: Props) {
  const { pageInfo, displayItems, paddingClass, setPageInfo } =
    useMediaSlider(medias)
  const { itemSize, countPerPage } = useMediaSliderItemSizeInfo()

  if (!medias || medias.length < 1 || itemSize < 1 || countPerPage < 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={paddingClass}>
        <div className="flex w-full justify-between items-center">
          <div className="text-base sm:text-xl">{title}</div>
          <MediaSliderNavigator pageInfo={pageInfo} />
        </div>
      </div>

      <Slider<MediaInfo, MediaInfo[]>
        data={medias}
        itemSize={itemSize}
        countPerPage={countPerPage}
        className={paddingClass}
        onPageInfoUpdated={setPageInfo}
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
              />

              <SliderItemContainer {...sliderInfo}>
                {displayItems.map((item, i) => (
                  <MediaSliderItem key={i} media={item} itemSize={itemSize} />
                ))}
              </SliderItemContainer>

              {showNextButton && (
                <MediaSliderNavButton
                  direction="Next"
                  pageInfo={sliderInfo.pageInfo}
                  setNavInfo={sliderInfo.setNavInfo}
                  setDiableTransition={sliderInfo.setDiableTransition}
                />
              )}
            </>
          )
        }}
      </Slider>
    </div>
  )
}
