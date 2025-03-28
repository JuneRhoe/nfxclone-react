import { NavDirection } from './components/SliderNavButton'
import { NavInfo, PageInfo } from './hooks'

export function getInitialPageInfo(countPerPage: number): PageInfo {
  return {
    countPerPage,
    curPage: -1,
    totalPage: 0,
    direction: 'Next',
    nextVector: '0%',
    prevVector: '0%',
    prevIndexItems: [],
  }
}

export function getInitialNavInfo(): NavInfo {
  return {
    direction: 'Next',
    vectorX: '0%',
  }
}

export function rotateArray(items: number[], rotateSteps: number): number[] {
  const rotatedItems = [...items]
  const itemLength = rotatedItems.length

  const normalizedSteps = rotateSteps % itemLength

  const reverse = (start: number, end: number): void => {
    for (; start < end; ++start, --end) {
      const temp = rotatedItems[start]
      rotatedItems[start] = rotatedItems[end]
      rotatedItems[end] = temp
    }
  }

  if (normalizedSteps > 0) {
    reverse(0, itemLength - 1)
    reverse(0, normalizedSteps - 1)
    reverse(normalizedSteps, itemLength - 1)
  } else {
    reverse(0, -normalizedSteps - 1)
    reverse(-normalizedSteps, itemLength - 1)
    reverse(0, itemLength - 1)
  }

  return rotatedItems
}

export function getSlideVector(
  slidePageInfo: PageInfo,
  itemSize: number,
  indexItems: number[],
) {
  const { countPerPage, curPage, totalPage } = slidePageInfo

  let prevVector = '0%'
  let nextVector = '0%'

  if (totalPage < 2) {
    return { prevVector, nextVector }
  }

  let nextFrame: number[] = []

  if (totalPage > 1) {
    if (curPage > -1) {
      nextFrame = indexItems.slice(countPerPage * 2, countPerPage * 3)
    } else {
      nextFrame = indexItems.slice(countPerPage, countPerPage * 2)
    }
  }

  let findedIndex = -1
  let slideAmount = 0

  if (curPage === 1) {
    prevVector = `-${100 - itemSize * indexItems[countPerPage]}%`
  }

  findedIndex = nextFrame.findIndex((value) => value === 0)
  if (findedIndex < 0 || curPage + 1 === totalPage) {
    slideAmount =
      curPage < 0 ? itemSize * countPerPage : itemSize * countPerPage * 2
    nextVector = nextFrame.length < 1 ? '0%' : `-${slideAmount}%`
  } else {
    slideAmount = curPage < 0 ? 0 : itemSize * countPerPage
    slideAmount += itemSize * findedIndex
    nextVector = `-${slideAmount}%`
  }

  return { prevVector, nextVector }
}

export function getIndexItems(
  countPerPage: number,
  curPage: number,
  totalPage: number,
  direction: NavDirection,
  tempItems: number[],
  indexItems: number[],
): number[] {
  let prevFrame: number[] = []
  let midFrame: number[] = []
  let nextFrame: number[] = []

  if (direction === 'Prev') {
    if (curPage === 0) {
      prevFrame = rotateArray(tempItems, countPerPage).slice(0, countPerPage)
      midFrame = tempItems.slice(0, countPerPage)
      nextFrame = rotateArray(tempItems, -countPerPage).slice(0, countPerPage)
    } else {
      const prevIndexItems = [...indexItems]
      const firstIndex = prevIndexItems[0]

      prevFrame = rotateArray(tempItems, countPerPage - firstIndex).slice(
        0,
        countPerPage,
      )
      midFrame = prevIndexItems.slice(0, countPerPage * 2)
    }
  } else {
    if (curPage + 1 === totalPage) {
      const reversedItems = [...tempItems].reverse()

      prevFrame = rotateArray(reversedItems, -countPerPage)
        .slice(0, countPerPage)
        .reverse()
      midFrame = reversedItems.slice(0, countPerPage).reverse()
      nextFrame = rotateArray(reversedItems, countPerPage)
        .slice(0, countPerPage)
        .reverse()
    } else {
      prevFrame = rotateArray(tempItems, -(curPage - 1) * countPerPage).slice(
        0,
        countPerPage,
      )
      midFrame = rotateArray(tempItems, -curPage * countPerPage).slice(
        0,
        countPerPage,
      )
      nextFrame = rotateArray(tempItems, -(curPage + 1) * countPerPage).slice(
        0,
        countPerPage,
      )
    }
  }

  return [...prevFrame, ...midFrame, ...nextFrame]
}
