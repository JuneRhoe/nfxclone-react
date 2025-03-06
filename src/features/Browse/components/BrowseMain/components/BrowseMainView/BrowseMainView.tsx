import { useMainViewMedia } from './hooks'
import BrowseMainViewImage from './components/BrowseMainViewImage'
import BrowseMainViewVideo from './components/BrowseMainViewVideo'

export default function BrowseMainView() {
  const { mainViewImageProps, mainViewVideoProps } = useMainViewMedia()

  return (
    <div className="flex w-full relative">
      <BrowseMainViewImage {...mainViewImageProps} />
      <div
        className="absolute bottom-0 w-full h-20 z-2 duration-400 bg-linear-to-t from-[#171717]
          to-transparent"
      />
      <BrowseMainViewVideo {...mainViewVideoProps} />
    </div>
  )
}
