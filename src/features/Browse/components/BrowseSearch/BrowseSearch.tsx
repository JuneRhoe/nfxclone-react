import MediaSliderItem from '../BrowseMain/components/MediaSliderContainer/components/MediaSlider/components/MediaSliderItem'
import {
  useMoreInfoModal,
  useSearchItemSizeInfo,
  useSearchQuery,
} from './hooks'
import MediaMoreInfoModal from '../BrowseMain/components/MediaMoreInfoModal/MediaMoreInfoModal'

export default function BrowseSearch() {
  const { itemSize, gapX } = useSearchItemSizeInfo()

  const {
    moreInfoModal,
    isMoreInfoModalVisible,
    moreInfoModalInfo,
    setMoreInfoModalInfo,
  } = useMoreInfoModal()

  const { isLoading, queryKey, medias } = useSearchQuery()

  return (
    <div className="w-full px-3 py-4 md:px-8 md:py-6">
      {medias && (
        <div className={`flex w-full flex-wrap gap-x-[${gapX}%] gap-y-[4vw]`}>
          {medias.map((mediaInfo) => (
            <MediaSliderItem
              key={mediaInfo.id}
              mediaInfo={mediaInfo}
              itemSize={itemSize}
              isSliding={false}
              onShowMoreInfoModal={(mediaInfo, itemRect) => {
                setMoreInfoModalInfo({ mediaInfo, itemRect })
                moreInfoModal.closeAllModal()
                moreInfoModal.openModal()
              }}
            />
          ))}
        </div>
      )}

      {!medias && (
        <div className="flex h-[5rem] w-full flex-col items-center justify-center p-4 text-gray-500">
          {!isLoading && (
            <>
              {queryKey?.length < 2 ? (
                'The search keyword must be at least 2 characters long.'
              ) : (
                <>
                  <div>No search results found.</div>
                  <div>Please enter a different keyword.</div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {isMoreInfoModalVisible && moreInfoModalInfo && (
        <MediaMoreInfoModal
          {...moreInfoModal}
          mediaInfo={moreInfoModalInfo.mediaInfo}
          itemRect={moreInfoModalInfo.itemRect}
        />
      )}
    </div>
  )
}
