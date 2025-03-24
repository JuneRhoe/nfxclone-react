import { MOCK_MAP_MAIN_CATEGORIES } from "@/mock/mock-data"
import { useRequestMainCategoryMedias } from "../MediaSliderContainer/hooks"
import { MediaInfo } from "@/mock/mock-data-definitions"
import { useMemo } from "react"

export function useMediaMoreInfoModalMoreLikeThis(mediaInfo: MediaInfo) {
  const firstCategoryIndex = useMemo(() => Math.floor(
    Math.random() * MOCK_MAP_MAIN_CATEGORIES.size + 1,
  ), [])

  const secondCategoryIndex = useMemo(() => {
    let secondCategoryIndex = firstCategoryIndex
    while (secondCategoryIndex === firstCategoryIndex) {
      secondCategoryIndex = Math.floor(
        Math.random() * MOCK_MAP_MAIN_CATEGORIES.size + 1,
      )
    }
    return secondCategoryIndex
  }, [firstCategoryIndex])
  
  const { isLoading: isFirstLoading, medias: firstMedias } = useRequestMainCategoryMedias(
    firstCategoryIndex.toString(),
  )

  const { isLoading: isSecondLoading, medias: secondMedias } = useRequestMainCategoryMedias(
    secondCategoryIndex.toString(),
  )

  const mergedMedias = [ ...(firstMedias || []), ...(secondMedias || [])].filter(({ id }) => id !== mediaInfo.id)

  return { isLoading: isFirstLoading || isSecondLoading, medias: mergedMedias }
}