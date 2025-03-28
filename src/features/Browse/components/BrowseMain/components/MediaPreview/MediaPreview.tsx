import MediaPreviewImage from './components/MediaPreviewImage'
import MediaPreviewVideo from './components/MediaPreviewVideo'
import { useMediaPreviewMedia } from './hooks'

interface Props {
  onImageLoaded?: (loaded: boolean) => void
}

export default function MediaPreview({ onImageLoaded }: Props) {
  const { mediaPreviewImageProps, mediaPreviewVideoProps } =
    useMediaPreviewMedia()

  return (
    <div className="relative flex w-full">
      <MediaPreviewImage
        {...mediaPreviewImageProps}
        onImageLoaded={(loaded) => {
          mediaPreviewImageProps.onImageLoaded(loaded)
          onImageLoaded?.(loaded)
        }}
      />
      <div
        className="absolute bottom-[-3px] z-2 h-20 w-full bg-linear-to-t from-[#171717]
          to-transparent duration-400"
      />
      <MediaPreviewVideo {...mediaPreviewVideoProps} />
    </div>
  )
}
