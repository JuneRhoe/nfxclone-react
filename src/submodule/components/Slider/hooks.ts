import { useEffect, useState } from "react"
import { NavDirection } from "./components/SliderNavButton"
import { getIndexItems, getInitialNavInfo, getInitialPageInfo, getSlideVector, rotateArray } from "./utils"

export interface PageInfo {
  countPerPage: number
  curPage: number
  totalPage: number
  direction: NavDirection
  nextVector: string
  prevVector: string
  prevIndexItems: number[]
}

export interface NavInfo {
  direction: NavDirection
  vectorX: string
}

export const handleNavButtonClick = (
  direction: NavDirection,
  pageInfo: PageInfo,
  setNavInfo: (navInfo: NavInfo) => void,
  setDiableTransition: (disabled: boolean) => void,  
) => {
  setDiableTransition(false)
  
  setNavInfo({
    direction,
    vectorX: direction === 'Prev' ? pageInfo.prevVector : pageInfo.nextVector,
  })
}

export const handleTransitionEnd = (
  navInfo: NavInfo,
  pageInfo: PageInfo,
  itemSize: number,
  setNavInfo: (navInfo: NavInfo) => void,
  setPageInfo: (pageInfo: PageInfo) => void,
  setDiableTransition: (disabled: boolean) => void,  
) => {
  let updatedCurPage = 0

  if (navInfo.direction === 'Prev') {
    updatedCurPage = pageInfo.curPage - 1

    if (updatedCurPage < 0) {
      updatedCurPage = pageInfo.totalPage - 1
    }
  } else {
    updatedCurPage = pageInfo.curPage + 1

    if (updatedCurPage > pageInfo.totalPage - 1) {
      updatedCurPage = 0
    }
  }

  pageInfo.curPage = updatedCurPage
  pageInfo.direction = navInfo.direction
  setPageInfo({ ...pageInfo })  

  setNavInfo({
    ...navInfo,
    vectorX: `-${itemSize * pageInfo.countPerPage}%`,
  })

  setDiableTransition(true)
}

export function useSlider<TData, TDataArray extends TData[]>(
  data: TDataArray | null,
  itemSize: number,
  countPerPage: number,
  onPageInfoUpdated?: (pageInfo: PageInfo) => void
) {
  const [navInfo, setNavInfo] = useState<NavInfo>(getInitialNavInfo())
  const [disableTransition, setDiableTransition] = useState(false)

  const [initialIndices, setInitialIndices] = useState<number[]>([])
  
  const [pageInfo, setPageInfo] = useState<PageInfo>(getInitialPageInfo(countPerPage))

  useEffect(() => {
    if (!data || initialIndices.length > 0) {
      return
    }

    setInitialIndices(Array.from(Array(data.length).keys()))
  }, [data, initialIndices])

  useEffect(() => {
    setNavInfo(getInitialNavInfo())
    setPageInfo(getInitialPageInfo(countPerPage))
   }, [itemSize, countPerPage])

  useEffect(() => {
    if (!data || pageInfo.totalPage > 0) {
      return
    }

    pageInfo.totalPage = Math.ceil(data.length / pageInfo.countPerPage)
    setPageInfo({ ...pageInfo })
  }, [data, pageInfo])

  useEffect(() => {
    if (!data || pageInfo.totalPage < 1) {
      return
    }

    const { countPerPage, curPage, totalPage, direction } = pageInfo

    let newItems: number[] = []

    if (curPage < 0) {
      if (totalPage < 2) {
        newItems = [...initialIndices]
      } else {
        newItems = [
          ...initialIndices.slice(0, countPerPage),
          ...rotateArray(initialIndices, -countPerPage).slice(0, countPerPage),
        ]
      }
    } else {
      newItems = getIndexItems(
        countPerPage,
        curPage,
        totalPage,
        direction,
        initialIndices,
        pageInfo.prevIndexItems,
      )
    }

    const { prevVector, nextVector } = getSlideVector(
      pageInfo,
      itemSize,
      newItems,
    )
    pageInfo.prevVector = prevVector
    pageInfo.nextVector = nextVector
    pageInfo.prevIndexItems = newItems
    pageInfo.curPage = curPage < 0 ? 0 : pageInfo.curPage
  }, [data, itemSize, pageInfo, initialIndices])

  useEffect(() => {
    onPageInfoUpdated?.(pageInfo)
  }, [onPageInfoUpdated, pageInfo])

  return {
    navInfo,
    pageInfo,
    disableTransition,  
    setNavInfo,
    setPageInfo,
    setDiableTransition,
    handleNavButtonClick,
    handleTransitionEnd,
  }
}