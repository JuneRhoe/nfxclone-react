import Image from '@/submodule/components/Image/Image'
import { MediaInfo } from '@/mock/mock-data-definitions'
import { getTitleImgPath } from '@/features/Browse/components/BrowseMain/components/MediaPreview/utils'

export interface Props {
  mediaInfo: MediaInfo | undefined
}

export default function MediaSliderItemModalTop({ mediaInfo }: Props) {
  if (!mediaInfo) {
    return null
  }

  return (
    <Image src={getTitleImgPath(mediaInfo.id)} fullHeight={false} fullWidth />
  )
}
