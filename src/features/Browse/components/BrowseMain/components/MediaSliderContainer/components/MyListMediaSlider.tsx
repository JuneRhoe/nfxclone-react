import Loader from '@/submodule/components/Loader/Loader'
import { useRequestMyListMedias } from '../hooks'
import { PADDING_CLASS } from './MediaSlider/hooks'
import MediaSlider from './MediaSlider/MediaSlider'

interface Props {
  showLoader?: boolean
}

export default function MyListMediaSlider({ showLoader }: Props) {
  const { isLoading, medias, titleLabel } = useRequestMyListMedias()

  if (isLoading && showLoader) {
    return <Loader className="opacity-50" display="inline" />
  }

  if (!medias || medias.length < 1) {
    return (
      <div className="flex flex-col gap-2">
        <div className={PADDING_CLASS}>
          <div className="flex w-full justify-between items-center wh">
            <div className="text-base sm:text-xl">{titleLabel}</div>
          </div>
          <div
            className="flex justify-center items-center text-gray-500 text-sm sm:text-base text-center
              p-4"
          >
            Please add movies and tv shows to My List
          </div>
        </div>
      </div>
    )
  }

  return <MediaSlider title={titleLabel} medias={medias} />
}
