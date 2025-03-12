import Loader from '@/submodule/components/Loader/Loader'
import { useRequestMainCategoryMedias } from '../hooks'
import MediaSlider from './MediaSlider/MediaSlider'

interface Props {
  mainCategory: string
  showLoader?: boolean
}

export default function MainCategoryMediaSlider({
  mainCategory,
  showLoader,
}: Props) {
  const { isLoading, title, medias } =
    useRequestMainCategoryMedias(mainCategory)

  if (isLoading && showLoader) {
    return <Loader className="opacity-50" display="inline" />
  }

  return <MediaSlider title={title} medias={medias} />
}
