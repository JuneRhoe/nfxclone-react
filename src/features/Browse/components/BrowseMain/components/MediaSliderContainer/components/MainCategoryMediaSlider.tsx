import { useRequestMainCategoryMedias } from '../hooks'
import MediaSlider from './MediaSlider/MediaSlider'

interface Props {
  mainCategory: string
}

export default function MainCategoryMediaSlider({ mainCategory }: Props) {
  const { title, medias } = useRequestMainCategoryMedias(mainCategory)

  return <MediaSlider title={title} medias={medias} />
}
