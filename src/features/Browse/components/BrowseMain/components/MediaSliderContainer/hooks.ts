import { MOCK_MAP_MAIN_CATEGORIES, MOCK_MEDIAS } from "@/mock-data";
import { MediaInfo } from "@/mock-data-definitions";
import { PageInfo } from "@/submodule/components/Slider/hooks";
import { SliderItemSizeInfo } from "@/submodule/components/Slider/Slider";
import { useScreenSize } from "@/submodule/hooks";
import { useTackstackQuery } from "@/submodule/tanstack/hooks";
import { queryFunction } from "@/submodule/tanstack/utils";
import { useEffect, useState } from "react";

const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'
const NAV_BUTTON_CLASS = `absolute z-50 cursor-pointer flex justify-center items-center w-[1.5rem]
                sm:w-[2.5rem] min-h-full bg-[#171717] opacity-70 hover:opacity-85 top-0
                transition-opacity duration-300`
const ITEM_CLASS = `aspect-9/5 pr-1`

export function useRequestMyListMedias() {
  const [medias, setMedias] = useState<MediaInfo[] | null>(null)

  useEffect(() => {
    if (medias) {
      return
    }

    setMedias(MOCK_MEDIAS)
  }, [medias])

  return { medias };
}

export function useRequestMainCategories() {
  const [mainCategories, setMainCategories] = useState<string[]>([])

  useEffect(() => {
    if (mainCategories.length > 0) {
      return
    }

    setMainCategories(Array.from(MOCK_MAP_MAIN_CATEGORIES.keys()))
  }, [mainCategories])

  return { mainCategories }
}

export function useRequestMainCategoryMedias(mainCategory: string) {
  const [medias, setMedias] = useState<MediaInfo[] | null>(null)

  const { isLoading, status, data } = useTackstackQuery<MediaInfo[]>(
      [mainCategory],
      async () => {
        const response = await queryFunction('medias', [
          { name: 'mainCategory', value: mainCategory }
        ])
  
        return await response?.json()
      }
  )
  
  useEffect(() => {
    if (isLoading || status !== 'success' || !data) {
      return
    }

    setMedias(data)
  }, [data, isLoading, status])

  return { medias, title: MOCK_MAP_MAIN_CATEGORIES.get(mainCategory) || '' };
}

export function useMediaSlider(medias: MediaInfo[] | null) {
  const [displayItems, setDisplayItems] = useState<MediaInfo[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)

  const { itemSize } = useMediaSliderItemSizeInfo()

  useEffect(() => {
    if (!medias || !pageInfo?.prevIndexItems) {
      return
    }

    const newDisplayItems: MediaInfo[] = []

    for (let i = 0; i < pageInfo.prevIndexItems.length; i++) {
      newDisplayItems.push(medias[pageInfo.prevIndexItems[i]])
    }

    setDisplayItems(newDisplayItems)
  }, [pageInfo?.prevIndexItems, medias])

  const itemStyle: React.CSSProperties = { width: `${itemSize}%` }

  return {
    pageInfo,
    displayItems,
    paddingClass: PADDING_CLASS,
    navButtonClass: NAV_BUTTON_CLASS,
    itemClass: ITEM_CLASS,
    itemStyle,
    setPageInfo
  }
}

export function useMediaSliderItemSizeInfo(): SliderItemSizeInfo {
  const screenSize = useScreenSize()

  switch (screenSize) {
    case 'xs':
      return {
        itemSize: 100 / 2,
        countPerPage: 2
      }
    case 'sm':
      return {
        itemSize: 100 / 3,
        countPerPage: 3
      }
    case 'md':
      return {
        itemSize: 100 / 4,
        countPerPage: 4
      }
    case 'lg':
      return {
        itemSize: 100 / 5,
        countPerPage: 5
      }
    case '2xl':
      return {
        itemSize: 100 / 6,
        countPerPage: 6
      }
    
  }

  return {
    itemSize: 0,
    countPerPage: 0
  }
}
