import { useEffect, useState } from "react"
import { NavDirection } from "./components/SliderNavButton"
import { getIndexItems, getInitialNavInfo, getInitialPageInfo, getSlideVector, rotateArray } from "./utils"
import { TouchPos } from "@/features/Browse/components/BrowseMain/components/MediaSliderContainer/components/MediaSlider/utils"

const TOUCH_SKIP_X_DIFF = 50
const TOUCH_SKIP_Y_DIFF = 25

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
  itemSize: number,
  navInfo: NavInfo,
  pageInfo: PageInfo,  
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
    updatedCurPage = pageInfo.curPage + 1 + (pageInfo.curPage < 0 ? 1 : 0)

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
  countPerPage: number,
  itemSize: number
) {
  const [navInfo, setNavInfo] = useState<NavInfo>(getInitialNavInfo())
  const [disableTransition, setDiableTransition] = useState(false)

  const [initialIndices, setInitialIndices] = useState<number[]>([])

  const [touchPos, setTouchPos] = useState<TouchPos | null>(null)
  
  const [pageInfo, setPageInfo] = useState<PageInfo>(getInitialPageInfo(countPerPage))

  useEffect(() => {
    if (!data || initialIndices.length > 0) {
      return
    }

    setInitialIndices(Array.from(Array(data.length).keys()))
  }, [data, initialIndices])

  useEffect(() => {
    if (!data || pageInfo.totalPage > 0 || pageInfo.countPerPage < 1) {
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

    setPageInfo(pageInfo)
  }, [data, itemSize, pageInfo, initialIndices])

   useEffect(() => {
    setNavInfo(getInitialNavInfo())
    setPageInfo(getInitialPageInfo(countPerPage))
   }, [itemSize, countPerPage])
  
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPos({
      clientX: Math.floor(e.touches[0].clientX),
      clientY: Math.floor(e.touches[0].clientY),
    })
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPos(null)

    const clientX = Math.floor(e.changedTouches[0].clientX)
    const clientY = Math.floor(e.changedTouches[0].clientY)
    const xDiff = clientX - (touchPos?.clientX || 0)
    const yDiff = Math.abs(clientY - (touchPos?.clientY || 0))

    const showPrevButton =
      pageInfo.prevIndexItems.length / pageInfo.countPerPage > 2
    const showNextButton =
      pageInfo.prevIndexItems.length / pageInfo.countPerPage > 1
    
    if (yDiff > TOUCH_SKIP_Y_DIFF) {
      return
    }

    if (xDiff < -1 * TOUCH_SKIP_X_DIFF) {
      if (!showNextButton) {
        return
      }

      handleNavButtonClick(
        'Next',
        pageInfo,
        setNavInfo,
        setDiableTransition,
      )
    } else if (xDiff > TOUCH_SKIP_X_DIFF) {
      if (!showPrevButton) {
        return
      }

      handleNavButtonClick(
        'Prev',
        pageInfo,
        setNavInfo,
        setDiableTransition,
      )
    }
  }

  return {
    navInfo,
    pageInfo,
    disableTransition,
    setNavInfo,
    setPageInfo,
    setDiableTransition,
    handleNavButtonClick,
    handleTransitionEnd,
    onTouchStart,
    onTouchEnd
  }
}