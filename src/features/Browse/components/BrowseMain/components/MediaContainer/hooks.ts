import { PageInfo } from "@/submodule/components/Slider/hooks";
import { useScreenSize } from "@/submodule/hooks";
import { useEffect, useState } from "react";

// const mockMedias: string[] = [
//   '0', '1', '2', '3', '4',
//   '5', '6', '7', '8', '9',
//   '10', '11', '12', '13', '14',
//   '15', '16', '17', '18', '19',
//   '20', 'A']

// const mockMedias: string[] = [
//   '000', '11', '22', '33', '44',
//   '55', '66', '77', '88', '99',
//   'AA', 'BB', 'CC', ]

// const mockMedias: string[] = [
//   '000', '11', '22', '33', '44',
//   '55', '66', ]

// const mockMedias: string[] = [
//   '000', '11', '22',
// ]

// const mockMedias: MediaType[] = [
//   { index: 0, name: '00' },
//   { index: 1, name: '11' },
//   { index: 2, name: '22' },
//   { index: 3, name: '33' },
//   { index: 4, name: '44' },
//   { index: 5, name: '55' },
//   { index: 6, name: '66' },
//   { index: 7, name: '77' },
//   { index: 8, name: '88' },
//   { index: 9, name: '99' },
//   { index: 10, name: '1010' },
//   { index: 11, name: '1111' },
//   { index: 12, name: '1212' },
// ]

const mockMedias: MediaType[] = [
  { index: 0, name: '00' }, 
  { index: 1, name: '11' },
  { index: 2, name: '22' },
  { index: 3, name: '33' },
  { index: 4, name: '44' },
  { index: 5, name: '55' },
  { index: 6, name: '66' },
  { index: 7, name: '77' },
  { index: 8, name: '88' },
  { index: 9, name: '99' },
  { index: 10, name: '1010' },
  { index: 11, name: '1111' },
  { index: 12, name: '1212' },
]

const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'
const NAV_BUTTON_CLASS = `absolute z-50 cursor-pointer flex justify-center items-center w-[1.5rem]
                sm:w-[2.5rem] min-h-full bg-[#171717] opacity-70 hover:opacity-85 top-0
                transition-opacity duration-300`
const ITEM_CLASS = `aspect-9/5 pr-1`

export interface MediaType {
  index: number
  name: string
}

export interface SliderItemSizeInfo {
  itemSize: number
  countPerPage: number
}

export function useRequestMedias() {
  const [medias, setMedias] = useState<MediaType[] | null>(null)

  useEffect(() => {
    if (medias) {
      return
    }

    setMedias(mockMedias)
  }, [medias])

  return { medias };
}

export function useMediaSlider(medias: MediaType[] | null) {
  const [displayItems, setDisplayItems] = useState<MediaType[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)

  const { itemSize } = useSliderItemSizeInfo()

  useEffect(() => {
    if (!medias || !pageInfo?.prevIndexItems) {
      return
    }

    const newDisplayItems: MediaType[] = []

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

export function useSliderItemSizeInfo(): SliderItemSizeInfo {
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
