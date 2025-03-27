import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock/mock-data-definitions'
import { getTitleImgPath } from '../../MediaPreview/utils'
import { useMyListMedias } from '../../MediaSliderContainer/components/MediaSlider/hooks'
import IconButton from '@/submodule/components/IconButton/IconButton'

interface Props {
  mediaInfo: MediaInfo
}

export default function MediaMoreInfoModalMoreLikeThisItem({
  mediaInfo,
}: Props) {
  const { isInMyList, isUpdatingMyList, hanldeClickMyList } =
    useMyListMedias(mediaInfo)

  return (
    <div className="flex aspect-9/5 flex-col rounded-md bg-[#2F2F2F]">
      <Image
        imgClassName="rounded-t-md"
        src={getTitleImgPath(mediaInfo.id)}
        fullHeight={false}
        fullWidth
      />

      <div className="flex h-auto w-full items-center justify-between gap-2 px-2 py-4">
        <div className="xs:text-sm flex w-full flex-wrap items-center gap-2 text-xs">
          <div
            className="flex items-center justify-center rounded-sm border-1 border-gray-400 px-1.5
              whitespace-nowrap"
          >
            {mediaInfo.ratingSymbol}
          </div>
          <div className="flex items-center">
            {mediaInfo.impressions?.slice(0, 1)}
          </div>
        </div>
        <div className="flex min-w-[2rem] items-center justify-center">
          <IconButton
            className="xs:w-[2rem] xs:h-[2rem] h-[1.75rem] w-[1.75rem]"
            iconClassName="w-[0.75rem] h-[0.75rem] xs:w-[1rem] xs:h-[1rem]"
            icon={isInMyList ? faCheck : faPlus}
            buttonProps={{ onClick: hanldeClickMyList }}
            loading={isUpdatingMyList}
          />
        </div>
      </div>

      <div className="text-ellipsi xs:text-sm min-h-[32vh] p-[3%] text-xs">
        {mediaInfo.description}
      </div>
    </div>
  )
}
