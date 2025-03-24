import { useEffect, useState } from "react";
import { PageInfo } from "@/submodule/components/Slider/hooks";
import { SliderItemSizeInfo } from "@/submodule/components/Slider/Slider";
import { useScreenSize } from "@/submodule/hooks";
import { MediaInfo, UserInfo } from "@/mock/mock-data-definitions";
import { getModalRect, TouchPos } from "./utils";
import { useRequestMyListMedias } from "../../hooks";
import { useTanstackMutation } from "@/submodule/tanstack/hooks";
import { mutationFunction } from "@/submodule/tanstack/utils";
import { setUserInfo } from "@/features/store/userInfoSlice";
import { useAppDispatch } from "@/features/store/hooks";
import { useDebouncedCallback } from "use-debounce";
import { ModalInstanceInfo } from "@/submodule/components/Modal/hooks";
import { queryClient } from "@/submodule/tanstack/client";
import { QUERY_KEY_USER_INFO } from "@/submodule/tanstack/queryKeys";

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

const CLOSE_MODAL_DELAY = 200
const MY_LIST_UPDATE_WAIT_TIME = 300

const OPEN_MODAL_POINTER_DELAY = 500
const OPEN_MODAL_TOUCH_DELAY = 100

export function useMediaSlider(
  pageInfo: PageInfo,
  medias: MediaInfo[] | null,
  title?: string,
  onUpdatePageInfo?: (pageInfo: PageInfo) => void
) {
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

  useEffect(() => {
    if (title || !onUpdatePageInfo) {
      return
    }

    onUpdatePageInfo(pageInfo)
  }, [title, pageInfo, onUpdatePageInfo])


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
  const [isButtonTouch, setIsButtonTouch] = useState(false)
  const [isPointerLeave, setIsPointerLeave] = useState(false)
  
  useEffect(() => {
    const timerId = setTimeout(() => setFade(true), 0)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  useEffect(() => {
    if (!isPointerLeave || isButtonTouch) {
      return
    }

    if (scrolledY === window.scrollY) {
      setFade(false)
      setTimeout(() => closeModal(), CLOSE_MODAL_DELAY)
    } else {
      closeAllModal()
    }
  }, [closeAllModal, closeModal, isPointerLeave, isButtonTouch, scrolledY])

  const {
    left: modalLeft,
    top: modalTop,
    width: modalWidth,
    height: modalHeight,
  } = getModalRect(itemRect)

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLButtonElement ||
      e.target instanceof SVGPathElement ||
      e.target instanceof SVGSVGElement      
    ) {
      setIsButtonTouch(true)
    }
  }

  const onTouchEnd = () => {
    setIsButtonTouch(false)
  }

  const onPointerLeave = () => {
    if (isButtonTouch) {
      return
    }

    setIsPointerLeave(true)
  }

  return {
    fade,
    modalLeft,
    modalTop,
    modalWidth,
    modalHeight,
    onTouchStart,
    onTouchEnd,
    onPointerLeave
  }
}

export function useMyListMedias(mediaInfo: MediaInfo | undefined) {
  const dispatch = useAppDispatch()
  const [isInMyList, setIsInMyList] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { myMedias, userInfo } = useRequestMyListMedias()  
  
  const updateMyListMutation = useTanstackMutation(
    (useInfo: UserInfo) => {
      setIsUpdating(true)

      if (!userInfo) {
        throw new Error('Invalid user.')
      }
      
      return mutationFunction<UserInfo>(`users/${userInfo.id}`, useInfo, 'PUT')
    },
    async (resposne, error) => {
      setIsUpdating(false)

      if (error) {
        console.error(error)

        return
      }

      let updatedUserInfo: UserInfo | null = null;
      
      try {
        updatedUserInfo = await resposne?.json()
      } catch (e) {
        console.error(e)
      }

      if (!updatedUserInfo) {
        return
      }

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEY_USER_INFO,
          updatedUserInfo.userId,
          updatedUserInfo.userPassword
        ]
      })

      dispatch(setUserInfo(updatedUserInfo))
    },
    () => setIsUpdating(false),
    () => setIsUpdating(false),
    () => setIsUpdating(false)
  )
  
  useEffect(() => {
    if (!myMedias || !mediaInfo) {
      return
    }

    setIsInMyList(myMedias.some((media) => media.id === mediaInfo.id))
  }, [myMedias, mediaInfo])

  const hanldeClickMyList = () => {
    if (!userInfo || !mediaInfo) {
      return
    }

    let updatedMyList: MediaInfo[] = []

    if (isInMyList) {
      updatedMyList = myMedias?.filter(({ id }) => id !== mediaInfo?.id) || []
    } else {
      updatedMyList = [...(myMedias || []), mediaInfo]
    }

    updateMyListMutation.mutate({ ...userInfo, myList: updatedMyList })
  }

  const hanldeClickMyListDebouncer = useDebouncedCallback(() => {
      hanldeClickMyList()
    }, MY_LIST_UPDATE_WAIT_TIME)

  
  
  return {
    isInMyList,
    isUpdatingMyList: isUpdating,
    hanldeClickMyList: hanldeClickMyListDebouncer,
  }
}

export function useMediaSliderItem(isSliding: boolean, modalInstanceInfo: ModalInstanceInfo) {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()
  const [touchPos, setTouchPos] = useState<TouchPos | null>(null)

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

    if (
      touchPos?.clientX !== clientX ||
      touchPos?.clientY !== clientY
    ) {
      return
    }

    if (isSliding) {
      return
    }

    setTimerId(
      setTimeout(() => {
        modalInstanceInfo.openModal()
        modalInstanceInfo.closeAllModal([
          modalInstanceInfo.modalId || '',
        ])
      }, OPEN_MODAL_TOUCH_DELAY),
    )
  }

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isSliding || e.pointerType === 'touch') {
      return
    }

    setTimerId(
      setTimeout(() => {
        modalInstanceInfo.openModal()
        modalInstanceInfo.closeAllModal([
          modalInstanceInfo.modalId || '',
        ])
      }, OPEN_MODAL_POINTER_DELAY),
    )
  }

  const onPointerLeave = () => {
    clearTimeout(timerId)
  }

  return {
    onTouchStart,
    onTouchEnd,
    onPointerEnter,
    onPointerLeave
  }
}