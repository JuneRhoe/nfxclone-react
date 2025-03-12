import { MOCK_MAP_MAIN_CATEGORIES } from "@/mock-data";
import { MediaInfo, UserCookieInfo, UserInfo } from "@/mock-data-definitions";
import { PageInfo } from "@/submodule/components/Slider/hooks";
import { SliderItemSizeInfo } from "@/submodule/components/Slider/Slider";
import { useScreenSize } from "@/submodule/hooks";
import { useTackstackQuery } from "@/submodule/tanstack/hooks";
import { queryFunction } from "@/submodule/tanstack/utils";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const PADDING_CLASS = 'px-[1.5rem] sm:px-[2.5rem]'

const MY_LIST_TITLE_LABEL = 'My List'

export function useRequestMyListMedias() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [cookies] = useCookies<'userId' | 'authToken', UserCookieInfo>([
      'userId',
      'authToken'
    ])

  const { isLoading, status, data } = useTackstackQuery<UserInfo[]>(
      ['userId', 'userPassword'],
      async () => {
        const response = await queryFunction('users', [
          { name: 'userId', value: cookies.userId },
          { name: 'userPassword', value: cookies.authToken }
        ])
  
        return await response?.json()
      }
  )
  
  useEffect(() => {
    if (isLoading || status !== 'success' || !data || !Array.isArray(data)) {
      return
    }

    const validUserInfo = data.find((userInfo) =>
      userInfo.userId === cookies.userId &&
      userInfo.userPassword === cookies.authToken
    )

    if (!validUserInfo) {
      return
    }

    setUserInfo(validUserInfo)

  }, [cookies.authToken, cookies.userId, data, isLoading, status])

  return { isLoading, medias: userInfo?.myList, titleLabel: MY_LIST_TITLE_LABEL }
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
    if (isLoading || status !== 'success' || !data || !Array.isArray(data)) {
      return
    }

    setMedias(data)
  }, [data, isLoading, status])

  return { isLoading, medias, title: MOCK_MAP_MAIN_CATEGORIES.get(mainCategory) || '' };
}

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
