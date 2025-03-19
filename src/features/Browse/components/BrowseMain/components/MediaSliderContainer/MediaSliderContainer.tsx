import clsx, { ClassValue } from 'clsx'
import MainCategoryMediaSlider from './components/MainCategoryMediaSlider'
import MyListMediaSliderContainer from './components/MyListMediaSliderContainer'
import { useRequestMainCategories } from './hooks'

interface Props {
  className?: ClassValue[] | string
  showLoader?: boolean
}

export default function MediaSliderContainer({ className, showLoader }: Props) {
  const { mainCategories } = useRequestMainCategories()

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <MyListMediaSliderContainer showLoader={showLoader} />

      {mainCategories.map((mainCategory) => (
        <MainCategoryMediaSlider
          key={mainCategory}
          mainCategory={mainCategory}
          showLoader={showLoader}
        />
      ))}
    </div>
  )
}
