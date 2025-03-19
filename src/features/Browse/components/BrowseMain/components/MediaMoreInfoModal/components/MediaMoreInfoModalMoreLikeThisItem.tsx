import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock-data-definitions'
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
    <div className="flex flex-col aspect-9/5 rounded-md bg-[#2F2F2F]">
      <Image
        imgClassName="rounded-t-md"
        src={getTitleImgPath(mediaInfo.id)}
        fullHeight={false}
        fullWidth
      />

      <div className="flex justify-between items-center gap-2 w-full h-auto py-4 px-2">
        <div className="flex items-center flex-wrap gap-2 w-full text-xs xs:text-sm">
          <div
            className="flex justify-center items-center whitespace-nowrap rounded-sm border-1
              border-gray-400 px-1.5"
          >
            {mediaInfo.ratingSymbol}
          </div>
          <div className="flex items-center">
            {mediaInfo.impressions?.slice(0, 1)}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <IconButton
            className="aspect-square w-[1.5rem] xs:w-[2rem]"
            iconClassName="w-[0.5rem] h-[0.5rem] xs:w-[1rem] xs:h-[1rem]"
            icon={isInMyList ? faCheck : faPlus}
            fullHeight
            buttonProps={{ onClick: hanldeClickMyList }}
            loading={isUpdatingMyList}
          />
        </div>
      </div>

      <div className="p-[3%] min-h-[32vh] text-ellipsi text-xs xs:text-sm">
        {mediaInfo.description}
      </div>
    </div>
  )
}
