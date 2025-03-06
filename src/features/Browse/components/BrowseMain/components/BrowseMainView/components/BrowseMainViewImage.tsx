import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Image from '@/submodule/components/Image/Image'
import Button from '@/submodule/components/Button/Button'
import { MainViewMediaInfo } from '../hooks'

export interface MainViewImageProps {
  mediaInfo: MainViewMediaInfo | null
  isVideoPlaying: boolean
  isVideoEnded: boolean
  onImageLoaded: (loaded: boolean) => void
}

export default function BrowseMainViewImage({
  mediaInfo,
  isVideoPlaying,
  isVideoEnded,
  onImageLoaded,
}: MainViewImageProps) {
  if (!mediaInfo) {
    return null
  }

  return (
    <div
      className={clsx(
        'w-full h-full transition-opacity duration-800 opacity-100',
        {
          'opacity-0': !isVideoPlaying && isVideoEnded,
        },
      )}
    >
      <Image
        className="w-full h-full"
        src={mediaInfo.mediaMainImg}
        imgProps={{
          onLoad: () => onImageLoaded(true),
        }}
      />
      <div
        className="absolute z-3 bottom-[10%] flex flex-col justify-end w-full h-[40%] px-[3%]
          gap-[8%]"
      >
        <div
          className="transition-all duration-600 h-[100%]"
          style={{
            height: isVideoPlaying && !isVideoEnded ? '60%' : '100%',
          }}
        >
          <Image src={mediaInfo.mediaTitleImg} />
        </div>
        <div className="flex gap-[1%]">
          <Button type="solid">
            <div className="flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faPlay} fixedWidth />
              Play
            </div>
          </Button>
          <Button type="secondary">
            <div className="flex justify-center items-center gap-1">
              <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
              More Info
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
