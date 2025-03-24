import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { useDebouncedCallback } from "use-debounce"
import { useScreenSize } from "@/submodule/hooks"
import { MoreInfoModalInfo } from "../BrowseMain/components/MediaSliderContainer/components/MediaSlider/MediaSlider"
import { useModal } from "@/features/Modal/hooks"
import { MediaInfo } from "@/mock/mock-data-definitions"
import { useTackstackQuery } from "@/submodule/tanstack/hooks"
import { QUERY_KEY_MEDIA_INFO_SEARCH } from "@/submodule/tanstack/queryKeys"
import { queryFunction } from "@/submodule/tanstack/utils"

const REQUEST_SEARCH_DELAY = 500

export interface SearchItemSizeInfo {
  itemSize: number
  gapX: number
}

export function useSearchItemSizeInfo(): SearchItemSizeInfo {
  const screenSize = useScreenSize()
  const gapX = 0.5

  switch (screenSize) {
    case 'xs':
      return {
        itemSize: (100 - gapX) / 2,
        gapX
      }
    case 'sm':
      return {
        itemSize: (100 - gapX * 2) / 3,
        gapX
      }
    case 'md':
      return {
        itemSize: (100 - gapX * 3) / 4,
        gapX
      }
    case 'lg':
      return {
        itemSize: (100 - gapX * 4) / 5,
        gapX
      }
    case '2xl':
      return {
        itemSize: (100 - gapX * 5) / 6,
        gapX
      }
    
  }

  return {
    itemSize: (100 - gapX * 2) / 3,
    gapX
  }
}

export function useMoreInfoModal() {
  const [moreInfoModalInfo, setMoreInfoModalInfo] =
    useState<MoreInfoModalInfo | null>(null)
  
  const {
    modalInstanceInfo: moreInfoModal,
    isVisible: isMoreInfoModalVisible,
  } = useModal({
    disableBodyScrollLock: false,
  })

  return {
    moreInfoModal,
    isMoreInfoModalVisible,
    moreInfoModalInfo,
    setMoreInfoModalInfo
  }
}

export function useSearchQuery() {
  const [searchParams] = useSearchParams()
  const [queryKey, setQueryKey] = useState<string>('')
  const queryKeyParam = searchParams.get('k')

  const [medias, setMedias] = useState<MediaInfo[] | null>(null)

  const requestSearch = () => {
    setQueryKey(queryKeyParam || '')
  }

  const requestSearchDebouncer = useDebouncedCallback(() => {
    requestSearch()
  }, REQUEST_SEARCH_DELAY)

  useEffect(() => {
    if (!queryKeyParam) {
      return
    }

    requestSearchDebouncer()
  }, [queryKeyParam, requestSearchDebouncer])

  const { isLoading, status, data } = useTackstackQuery<MediaInfo[]>(
    [QUERY_KEY_MEDIA_INFO_SEARCH, queryKey],
    async () => {
      const response = await queryFunction('medias', [
        { name: 'search', value: queryKey },
      ])

      return await response?.json()
    },
    !!queryKey && queryKey.length > 1,
  )

  useEffect(() => {
    if (isLoading || status !== 'success' || !data) {
      if (queryKey.length < 2) {
        setMedias(null)
      }

      return
    }

    if (!Array.isArray(data)) {
      setMedias(null)
      return
    }

    setMedias(data)
  }, [data, isLoading, status, queryKey])

  return { isLoading, queryKey, medias }
}