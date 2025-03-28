import {
  faAngleDown,
  faCheck,
  faPlay,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@/submodule/components/IconButton/IconButton'
import { MediaInfo } from '@/mock/mock-data-definitions'
import { useMyListMedias } from '../../../hooks'

export interface Props {
  mediaInfo: MediaInfo | undefined
  onShowMoreInfoModal: () => void
}

export default function MediaSliderItemModalBottom({
  mediaInfo,
  onShowMoreInfoModal,
}: Props) {
  const { isInMyList, isUpdatingMyList, hanldeClickMyList } =
    useMyListMedias(mediaInfo)

  if (!mediaInfo) {
    return null
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 px-3 py-2 text-sm text-white">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <IconButton
            className="aspect-square h-[2.5rem]"
            icon={faPlay}
            type="secondary"
            fullHeight
          />
          <IconButton
            className="aspect-square h-[2.5rem]"
            icon={isInMyList ? faCheck : faPlus}
            buttonProps={{
              onClick: () => {
                hanldeClickMyList()
              },
            }}
            loading={isUpdatingMyList}
            fullHeight
          />
        </div>

        <div className="">
          <IconButton
            className="aspect-square h-[2.5rem]"
            icon={faAngleDown}
            buttonProps={{
              onClick: () => {
                onShowMoreInfoModal()
              },
            }}
            fullHeight
          />
        </div>
      </div>

      <div className="flex h-full w-full items-center gap-2">
        <div
          className="flex items-center justify-center rounded-sm border-1 border-gray-400 px-1.5
            whitespace-nowrap"
        >
          {mediaInfo.ratingSymbol}
        </div>
        <div className="flex items-center">
          {mediaInfo.ratingDetails?.slice(0, 2)?.join(' • ')}
        </div>
      </div>

      <div className="h-full w-full">
        {mediaInfo.genres?.slice(0, 2)?.join(' • ')}
      </div>
    </div>
  )
}
