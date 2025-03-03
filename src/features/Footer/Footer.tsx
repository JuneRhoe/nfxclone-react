import { useContext } from 'react'
import { ThemeInfoContext } from '../App/context'
import clsx from 'clsx'

export default function Footer() {
  const { themeType } = useContext(ThemeInfoContext)

  return (
    <div
      className={clsx('flex h-[7.5rem] w-full items-center justify-center', {
        'text-[#737373]': themeType === 'lightMode',
        'text-white': themeType === 'darkMode',
      })}
    >
      Footer
    </div>
  )
}
