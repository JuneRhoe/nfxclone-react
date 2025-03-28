import clsx from 'clsx'
import { useAppSelector } from '../store/hooks'
import { selectThemeMode } from '../store/themeSlice'
import MyInfo from '../MyInfo/MyInfo'

export default function Footer() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div
      className={clsx('flex h-[7.5rem] w-full items-center justify-center', {
        'text-[#737373]': themeMode === 'lightMode',
        'text-white': themeMode === 'darkMode',
      })}
    >
      <div className="flex flex-col items-center gap-2 text-xl sm:text-2xl">
        <MyInfo />
      </div>
    </div>
  )
}
