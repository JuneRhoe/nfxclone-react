import { MediaInfo } from '@/mock-data-definitions'
import MediaMoreInfoModalMoreLikeThis from './MediaMoreInfoModalMoreLikeThis'

interface Props {
  mediaInfo: MediaInfo
}

export default function MediaMoreInfoModalBottom({ mediaInfo }: Props) {
  return (
    <div className="flex flex-col gap-8 p-[3%] text-sm md:text-base">
      <div className="flex items-start justify-between w-full gap-5">
        <div className="flex flex-col gap-3 w-[60%]">
          <div className="flex items-center gap-2 w-full h-full">
            <div
              className="flex justify-center items-center whitespace-nowrap rounded-sm border-1
                border-gray-400 px-1.5"
            >
              {mediaInfo.ratingSymbol}
            </div>
            <div className="flex items-center">
              {mediaInfo.ratingDetails?.join(' • ')}
            </div>
          </div>
          <div className="text-base md:text-2xl">{mediaInfo.title}</div>
          <div>{mediaInfo.description}</div>
        </div>
        <div className="flex flex-col gap-2 w-[40%]">
          <div className="flex gap-1">
            <div className="text-gray-500">Cast:</div>
            <div>{mediaInfo.casts?.join(', ')}</div>
          </div>
          <div className="flex gap-1">
            <div className="text-gray-500">Genres:</div>
            <div>{mediaInfo.genres?.join(', ')}</div>
          </div>
          <div className="flex gap-1">
            <div className="text-gray-500 whitespace-nowrap">
              This movie is:
            </div>
            <div>{mediaInfo.impressions?.join(', ')}</div>
          </div>
        </div>
      </div>
      <MediaMoreInfoModalMoreLikeThis mediaInfo={mediaInfo} />
    </div>
  )
}
