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
  }, [myMedias])

  if (showLoader) {
    return <Loader className="opacity-50" display="inline" />
  }

  if (!myMedias || myMedias.length < 1) {
    return (
      <div className="flex justify-center items-center w-full h-full text-gray-500 text-base p-5">
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
