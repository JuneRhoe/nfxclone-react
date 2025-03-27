import Loader from '@/submodule/components/Loader/Loader'
import { useMediaMoreInfoModalMoreLikeThis } from '../hooks'
import { MediaInfo } from '@/mock/mock-data-definitions'
import MediaMoreInfoModalMoreLikeThisItem from './MediaMoreInfoModalMoreLikeThisItem'

interface Props {
  mediaInfo: MediaInfo
}

export default function MediaMoreInfoModalMoreLikeThis({ mediaInfo }: Props) {
  const { isLoading, medias } = useMediaMoreInfoModalMoreLikeThis(mediaInfo)

  if (isLoading) {
    return <Loader className="opacity-50" display="inline" />
  }

  return (
    <div className="flex w-full flex-col gap-4 text-sm md:text-base">
      <div className="w-full text-base md:text-2xl">More Like This</div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {medias?.map((mediaInfo) => (
          <MediaMoreInfoModalMoreLikeThisItem
            key={mediaInfo.id}
            mediaInfo={mediaInfo}
          />
        ))}
      </div>
    </div>
  )
}
