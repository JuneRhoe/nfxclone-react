import { useEffect, useState } from 'react'
import { useAppSelector } from '@/features/store/hooks'
import { selectUserInfo } from '@/features/store/userInfoSlice'
import { MOCK_MAP_MAIN_CATEGORIES } from '@/mock/mock-data'
import { MediaInfo } from '@/mock/mock-data-definitions'
import { useTackstackQuery } from '@/submodule/tanstack/hooks'
import { QUERY_KEY_MEDIA_INFO_MAIN_CATEGORY } from '@/submodule/tanstack/queryKeys'
import { queryFunction } from '@/submodule/tanstack/utils'

export function useRequestMyListMedias() {
  const userInfo = useAppSelector(selectUserInfo)

  return { myMedias: userInfo?.myList, userInfo }
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
    [QUERY_KEY_MEDIA_INFO_MAIN_CATEGORY, mainCategory],
    async () => {
      const response = await queryFunction('medias', [
        { name: 'mainCategory', value: mainCategory },
      ])

      return await response?.json()
    },
  )

  useEffect(() => {
    if (isLoading || status !== 'success' || !data || !Array.isArray(data)) {
      return
    }

    setMedias(data)
  }, [data, isLoading, status])

  return {
    isLoading,
    medias,
    title: MOCK_MAP_MAIN_CATEGORIES.get(mainCategory) || '',
  }
}
