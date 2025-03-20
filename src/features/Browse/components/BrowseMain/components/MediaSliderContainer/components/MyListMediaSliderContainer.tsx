import { useState } from 'react'
import { PADDING_CLASS, useMediaSliderItemSizeInfo } from './MediaSlider/hooks'
import MyListMediaSlider from './MyListMediaSlider/MyListMediaSlider'
import { PageInfo } from '@/submodule/components/Slider/hooks'
import MediaSliderNavigator from './MediaSlider/components/MediaSliderNavigator'

export interface Props {
  showLoader?: boolean
  onUpdatePageInfo?: (pageInfo: PageInfo | null) => void
}

export default function MyListMediaSliderContainer(props: Props) {
  const { countPerPage } = useMediaSliderItemSizeInfo()
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <div className={PADDING_CLASS}>
        <div className="flex w-full justify-between items-center">
          <div className="text-base sm:text-xl">My List</div>
          {pageInfo && <MediaSliderNavigator pageInfo={pageInfo} />}
        </div>
      </div>

      <div
        className="w-full"
        style={{ aspectRatio: `${(9 * countPerPage) / 5}` }}
      >
        <MyListMediaSlider {...props} onUpdatePageInfo={setPageInfo} />
      </div>
    </div>
  )
}
