import { useEffect, useState } from "react";
import { PageInfo } from "@/submodule/components/Slider/hooks";
import { SliderItemSizeInfo } from "@/submodule/components/Slider/Slider";
import { useScreenSize } from "@/submodule/hooks";
import { MediaInfo } from "@/mock-data-definitions";
import { getModalRect } from "./utils";

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

const CLOSE_MODAL_DELAY = 200

export function useMediaSlider(pageInfo: PageInfo, medias: MediaInfo[] | null) {
  const [displayItems, setDisplayItems] = useState<MediaInfo[]>([])

  useEffect(() => {
    if (!medias || !pageInfo?.prevIndexItems) {
      return
    }

    const newDisplayItems: MediaInfo[] = []

    for (let i = 0; i < pageInfo.prevIndexItems.length; i++) {
      newDisplayItems.push(medias[pageInfo.prevIndexItems[i]])
    }

    setDisplayItems(newDisplayItems)
  }, [pageInfo, pageInfo?.prevIndexItems, medias])

  return {
    displayItems,
    paddingClass: PADDING_CLASS,
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
    countPerPage: 0,
    itemSize: 0    
  }
}

export function useMediaSliderItemModal(
  itemRect: DOMRect | null | undefined,
  closeModal: () => void,
  closeAllModal: () => void
) {
  const [fade, setFade] = useState(false)
  const [scrolledY] = useState(window.scrollY)
  const [pointerLeave, setPointerLeave] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => setFade(true), 0)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (!pointerLeave) {
      return
    }

    if (scrolledY === window.scrollY) {
      setFade(false)
      setTimeout(() => closeModal(), CLOSE_MODAL_DELAY)
    } else {
      closeAllModal()
    }
  }, [closeAllModal, closeModal, pointerLeave, scrolledY])

  const {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  } = getModalRect(itemRect)

  return {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    setPointerLeave
  }
}