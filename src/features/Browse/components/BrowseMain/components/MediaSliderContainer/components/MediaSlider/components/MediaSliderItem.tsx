import SliderItem from '@/submodule/components/Slider/components/SliderItem'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock-data-definitions'
import Loader from '@/submodule/components/Loader/Loader'

interface Props {
  media: MediaInfo
  itemSize: number
}

const getTitleImgPath = (id: string) =>
  `/images/browse-home/media-slider/title-img-${id}.jpg`

export default function MediaSliderItem({ media, itemSize }: Props) {
  return (
    <SliderItem className="aspect-9/5 pr-1" style={{ width: `${itemSize}%` }}>
      <div className="w-full h-full relative">
        <Image imgClassName="rounded-sm" src={getTitleImgPath(media.id)}>
          <div className="w-full h-full rounded-sm">
            <Loader className="opacity-50" display="inline" />
          </div>
        </Image>
      </div>
    </SliderItem>
  )
}
