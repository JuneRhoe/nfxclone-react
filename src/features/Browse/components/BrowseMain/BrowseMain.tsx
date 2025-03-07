import MediaContainer from './components/MediaContainer/MediaContainer'
import MediaPreview from './components/MediaPreview/MediaPreview'

export default function BrowseMain() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-start text-xl mt-[-3rem]
        md:mt-[-4.5rem]"
    >
      <div className="w-full">
        <MediaPreview />
      </div>
      <div className="w-full">
        <MediaContainer />
      </div>
    </div>
  )
}
