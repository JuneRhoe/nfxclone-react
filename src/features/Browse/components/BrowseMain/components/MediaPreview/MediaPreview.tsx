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
    <div className="flex w-full relative">
      <MediaPreviewImage
        {...mediaPreviewImageProps}
        onImageLoaded={(loaded) => {
          mediaPreviewImageProps.onImageLoaded(loaded)
          onImageLoaded?.(loaded)
        }}
      />
      <div
        className="absolute bottom-[-3px] w-full h-20 z-2 duration-400 bg-linear-to-t
          from-[#171717] to-transparent"
      />
      <MediaPreviewVideo {...mediaPreviewVideoProps} />
    </div>
  )
}
