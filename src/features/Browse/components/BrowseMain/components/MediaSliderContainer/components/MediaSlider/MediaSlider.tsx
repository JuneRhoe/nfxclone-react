import { useMediaSlider, useMediaSliderItemSizeInfo } from '../../hooks'
import Slider from '@/submodule/components/Slider/Slider'
import SliderItemContainer from '@/submodule/components/Slider/components/SliderItemContainer'
import { MediaInfo } from '@/mock-data-definitions'
import MediaSliderNavigator from './components/MediaSliderNavigator'
import MediaSliderNavButton from './components/MediaSliderNavButton'
import MediaSliderItem from './components/MediaSliderItem'
import { useSlider } from '@/submodule/components/Slider/hooks'

interface Props {
  title: string
  medias: MediaInfo[] | null
}

export default function MediaSlider({ title, medias }: Props) {
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
              />

              <SliderItemContainer {...sliderInfo}>
                {displayItems.map((item, i) => (
                  <MediaSliderItem key={i} media={item} itemSize={itemSize} />
                ))}
              </SliderItemContainer>

              <MediaSliderNavButton
                direction="Next"
                disabled={!showNextButton}
                pageInfo={sliderInfo.pageInfo}
                setNavInfo={sliderInfo.setNavInfo}
                setDiableTransition={sliderInfo.setDiableTransition}
              />
            </>
          )
        }}
      </Slider>
    </div>
  )
}
