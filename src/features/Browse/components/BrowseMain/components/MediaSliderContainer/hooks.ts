import { MOCK_MAP_MAIN_CATEGORIES } from "@/mock-data";
import { MediaInfo, UserCookieInfo, UserInfo } from "@/mock-data-definitions";
import { useTackstackQuery } from "@/submodule/tanstack/hooks";
import { queryFunction } from "@/submodule/tanstack/utils";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
