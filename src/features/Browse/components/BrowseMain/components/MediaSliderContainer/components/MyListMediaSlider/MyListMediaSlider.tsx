import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import Loader from '@/submodule/components/Loader/Loader'
import { useRequestMyListMedias } from '../../hooks'
import MediaSlider from '../MediaSlider/MediaSlider'
import { Props } from '../MyListMediaSliderContainer'

export default function MyListMediaSlider({
  showLoader,
  onUpdatePageInfo,
}: Props) {
  const { myMedias } = useRequestMyListMedias()
  const [sliderKey, setSliderKey] = useState(nanoid())

  useEffect(() => {
    setSliderKey(nanoid())

    if (!myMedias || myMedias.length < 1) {
      onUpdatePageInfo?.(null)
    }
  }, [myMedias, onUpdatePageInfo])

  if (showLoader) {
    return <Loader className="opacity-50" display="inline" />
  }

  if (!myMedias || myMedias.length < 1) {
    return (
      <div className="flex h-full w-full items-center justify-center p-5 text-base text-gray-500">
        Please add movies and tv shows to My List
      </div>
    )
  }

  return (
    <MediaSlider
      key={sliderKey}
      medias={myMedias}
      onUpdatePageInfo={onUpdatePageInfo}
    />
  )
}
