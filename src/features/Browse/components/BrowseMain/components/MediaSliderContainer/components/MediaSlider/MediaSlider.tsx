import { useMediaSlider, useMediaSliderItemSizeInfo } from '../../hooks'
import SliderItem from '@/submodule/components/Slider/components/SliderItem'
import Slider from '@/submodule/components/Slider/Slider'
import SliderItemContainer from '@/submodule/components/Slider/components/SliderItemContainer'
import MediaSliderNavButton from './MediaSliderNavButton'
import MediaSliderNavigator from './MediaSliderNavigator'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock-data-definitions'

interface Props {
  title: string
  medias: MediaInfo[] | null
}

const getTitleImgPath = (id: string) =>
  `/images/browse-home/media-slider/title-img-${id}.jpg`

export default function MediaSlider({ title, medias }: Props) {
  const {
    pageInfo,
    displayItems,
    paddingClass,
    navButtonClass,
    itemClass,
    itemStyle,
    setPageInfo,
  } = useMediaSlider(medias)
  const { itemSize, countPerPage } = useMediaSliderItemSizeInfo()

  if (itemSize < 1 || countPerPage < 1) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={paddingClass}>
        <div className="flex w-full justify-between items-center">
          <div>{title}</div>
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
        {(sliderInfo) => (
          <>
            <MediaSliderNavButton
              navButtonClass={navButtonClass}
              direction="Prev"
              pageInfo={sliderInfo.pageInfo}
              setNavInfo={sliderInfo.setNavInfo}
              setDiableTransition={sliderInfo.setDiableTransition}
            />

            <SliderItemContainer {...sliderInfo}>
              {displayItems.map((item, i) => (
                <SliderItem key={i} className={itemClass} style={itemStyle}>
                  <div className="w-full h-full">
                    <Image
                      className="rounded-sm"
                      src={getTitleImgPath(item.id)}
                    />
                  </div>
                </SliderItem>
              ))}
            </SliderItemContainer>

            <MediaSliderNavButton
              navButtonClass={navButtonClass}
              direction="Next"
              pageInfo={sliderInfo.pageInfo}
              setNavInfo={sliderInfo.setNavInfo}
              setDiableTransition={sliderInfo.setDiableTransition}
            />
          </>
        )}
      </Slider>
    </div>
  )
}
