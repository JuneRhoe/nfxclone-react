import MediaPreviewImage from './components/MediaPreviewImage'
import MediaPreviewVideo from './components/MediaPreviewVideo'

import { useMediaPreviewMedia } from './hooks'

export default function MediaPreview() {
  const { mediaPreviewImageProps, mediaPreviewVideoProps } =
    useMediaPreviewMedia()

  return (
    <div className="flex w-full relative">
      <MediaPreviewImage {...mediaPreviewImageProps} />
      <div
        className="absolute bottom-[-3px] w-full h-20 z-2 duration-400 bg-linear-to-t
          from-[#171717] to-transparent"
      />
      <MediaPreviewVideo {...mediaPreviewVideoProps} />
    </div>
  )
}
