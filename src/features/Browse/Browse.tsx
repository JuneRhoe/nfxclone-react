import { Outlet } from 'react-router'
import BrowseTopNavBar from './components/BrowseTopNavBar/BrowseTopNavBar'
import { useContext } from 'react'
import { ThemeInfoContext } from '../App/context'
import clsx from 'clsx'

export default function Browse() {
  const { themeType } = useContext(ThemeInfoContext)

  return (
    <div
      className={clsx(
        'flex h-full min-h-[100vh] w-full flex-col items-start justify-start',
        {
          'bg-[#202020]': themeType === 'darkMode',
          'bg-[#F3F3F3]': themeType === 'lightMode',
        },
      )}
    >
      <BrowseTopNavBar />
      <Outlet />
    </div>
  )
}
