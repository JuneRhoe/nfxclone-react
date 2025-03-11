import { useRequestMyListMedias } from '../hooks'
import MediaSlider from './MediaSlider/MediaSlider'

export default function MyListMediaSlider() {
  const { medias } = useRequestMyListMedias()

  return <MediaSlider title="My List" medias={medias} />
}
