import clsx, { ClassValue } from 'clsx'
import MainCategoryMediaSlider from './components/MainCategoryMediaSlider'
import MyListMediaSlider from './components/MyListMediaSlider'
import { useRequestMainCategories } from './hooks'

interface Props {
  className?: ClassValue[] | string
}

export default function MediaSliderContainer({ className }: Props) {
  const { mainCategories } = useRequestMainCategories()

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <MyListMediaSlider />
      {mainCategories.map((mainCategory) => (
        <MainCategoryMediaSlider mainCategory={mainCategory} />
      ))}
    </div>
  )
}
