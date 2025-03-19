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
import { MediaInfo } from '@/mock-data-definitions'
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
        <div className="absolute z-5 left-[1%] bottom-[20%] sm:bottom-[18%] w-[80%] px-[2%]">
          <Image
            imgClassName="w-full"
            className="w-full"
            src={previewTitleImg}
          />
        </div>
      )}
      <div
        className="absolute z-6 bottom-[-3px] w-full h-30 bg-linear-to-t from-[#101010]
          to-transparent"
      />
      {fade && (
        <>
          <div
            className="absolute z-7 flex items-center gap-3 h-[6%] left-[1%] bottom-[6%] sm:bottom-[4%]
              px-[2%] text-sm"
          >
            <Button type="solid">
              <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faPlay} fixedWidth />
                Play
              </div>
            </Button>
            <IconButton
              className="h-full aspect-square min-h-[2rem]"
              icon={isInMyList ? faCheck : faPlus}
              fullHeight
              buttonProps={{ onClick: hanldeClickMyList }}
              loading={isUpdatingMyList}
            />
          </div>
          <div className="absolute right-[1%] top-[2%]">
            <IconButton
              type="simple"
              className="h-full aspect-square"
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
