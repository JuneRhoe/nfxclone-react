import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Image from '@/submodule/components/Image/Image'
import Button from '@/submodule/components/Button/Button'
import Loader from '@/submodule/components/Loader/Loader'
import { useModal } from '@/features/Modal/hooks'
import { MediaInfo } from '@/mock/mock-data-definitions'
import MediaMoreInfoModal from '../../MediaMoreInfoModal/MediaMoreInfoModal'
import { useRef } from 'react'

export interface MediaPreviewImageProps {
  mediaInfo: MediaInfo | null
  isVideoPlaying: boolean
  isVideoEnded: boolean
  onImageLoaded: (loaded: boolean) => void
}

export default function MediaPreviewImage({
  mediaInfo,
  isVideoPlaying,
  isVideoEnded,
  onImageLoaded,
}: MediaPreviewImageProps) {
  const moreInfoButtonRef = useRef<HTMLDivElement>(null)

  const {
    modalInstanceInfo: moreInfoModal,
    isVisible: isMoreInfoModalVisible,
  } = useModal({
    disableBodyScrollLock: false,
  })

  if (!mediaInfo) {
    return null
  }

  return (
    <>
      <div
        className={clsx(
          'h-full w-full opacity-100 transition-opacity duration-800',
          {
            'opacity-0': !isVideoPlaying && isVideoEnded,
          },
        )}
      >
        {mediaInfo.previewMainImg && (
          <Image
            imgClassName="w-full h-full"
            className="h-full w-full"
            src={mediaInfo.previewMainImg}
            imgProps={{
              onLoad: () => onImageLoaded(true),
            }}
            loader={<Loader display="full" />}
          />
        )}
        <div
          className="absolute bottom-[10%] z-3 flex h-[40%] w-full flex-col justify-end gap-[8%]
            px-[1.5rem] sm:px-[2.5rem]"
        >
          <div
            className="h-[100%] transition-all duration-600"
            style={{
              height: isVideoPlaying && !isVideoEnded ? '60%' : '100%',
            }}
          >
            {mediaInfo.previewTitleImg && (
              <Image src={mediaInfo.previewTitleImg} />
            )}
          </div>
          <div className="flex gap-[1%]">
            <Button type="solid">
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faPlay} fixedWidth />
                Play
              </div>
            </Button>
            <Button
              type="secondary"
              buttonProps={{ onClick: () => moreInfoModal.openModal() }}
            >
              <div
                ref={moreInfoButtonRef}
                className="flex items-center justify-center gap-1"
              >
                <FontAwesomeIcon icon={faCircleInfo} fixedWidth />
                More Info
              </div>
            </Button>
          </div>
        </div>
      </div>
      {isMoreInfoModalVisible && (
        <MediaMoreInfoModal
          {...moreInfoModal}
          mediaInfo={mediaInfo}
          itemRect={moreInfoButtonRef.current?.getBoundingClientRect()}
        />
      )}
    </>
  )
}
