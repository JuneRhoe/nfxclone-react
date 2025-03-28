import { useState } from 'react'
import MediaPreview from './components/MediaPreview/MediaPreview'
import MediaSliderContainer from './components/MediaSliderContainer/MediaSliderContainer'

export default function BrowseMain() {
  const [isPreviewImgLoaded, setIsPreviewImgLoaded] = useState(false)

  return (
    <div
      className="mt-[-3rem] flex h-full w-full flex-col items-center justify-start text-xl
        md:mt-[-4.5rem]"
    >
      <div className="w-full">
        <MediaPreview onImageLoaded={setIsPreviewImgLoaded} />
      </div>
      <div className="w-full">
        <MediaSliderContainer showLoader={!isPreviewImgLoaded} />
      </div>
    </div>
  )
}
