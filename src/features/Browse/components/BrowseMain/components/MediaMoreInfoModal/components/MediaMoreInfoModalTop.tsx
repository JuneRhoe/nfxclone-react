import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faPlay,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/submodule/components/Button/Button'
import Image from '@/submodule/components/Image/Image'
import IconButton from '@/submodule/components/IconButton/IconButton'
import { MediaInfo } from '@/mock/mock-data-definitions'
import { useMyListMedias } from '../../MediaSliderContainer/components/MediaSlider/hooks'

interface Props {
  mediaInfo: MediaInfo
  previewMainImg: string
  previewTitleImg: string | null
  fade: boolean
  fadeModal: () => void
}

export default function MediaMoreInfoModalTop({
  mediaInfo,
  previewMainImg,
  previewTitleImg,
  fade,
  fadeModal,
}: Props) {
  const { isInMyList, isUpdatingMyList, hanldeClickMyList } =
    useMyListMedias(mediaInfo)

  return (
    <div className="relative">
      <Image
        imgClassName="w-full rounded-t-xl"
        className="w-full"
        src={previewMainImg}
      />
      {previewTitleImg && (
        <div className="absolute bottom-[20%] left-[1%] z-5 w-[80%] px-[2%] sm:bottom-[18%]">
          <Image
            imgClassName="w-full"
            className="w-full"
            src={previewTitleImg}
          />
        </div>
      )}
      <div
        className="absolute bottom-[-3px] z-6 h-30 w-full bg-linear-to-t from-[#101010]
          to-transparent"
      />
      {fade && (
        <>
          <div
            className="absolute bottom-[6%] left-[1%] z-7 flex h-[6%] items-center gap-3 px-[2%]
              text-sm sm:bottom-[4%]"
          >
            <Button type="solid">
              <div className="flex items-center justify-center gap-1">
                <FontAwesomeIcon icon={faPlay} fixedWidth />
                Play
              </div>
            </Button>
            <IconButton
              className="aspect-square h-full min-h-[2rem]"
              icon={isInMyList ? faCheck : faPlus}
              fullHeight
              buttonProps={{ onClick: hanldeClickMyList }}
              loading={isUpdatingMyList}
            />
          </div>
          <div className="absolute top-[2%] right-[1%]">
            <IconButton
              type="simple"
              className="aspect-square h-full"
              icon={faXmark}
              fullHeight
              buttonProps={{
                onClick: () => {
                  setTimeout(() => fadeModal(), 100)
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
