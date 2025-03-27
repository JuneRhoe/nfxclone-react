import { Outlet } from 'react-router'
import BrowseTopNavBar from './components/BrowseTopNavBar/BrowseTopNavBar'
import clsx from 'clsx'
import ScrollToTop from '@/submodule/components/ScrollToTop/ScrollToTop'
import Footer from '../Footer/Footer'
import { useAppSelector } from '../store/hooks'
import { selectThemeMode } from '../store/themeSlice'

export default function Browse() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <>
      <ScrollToTop />
      <div
        className={clsx(
          `relative flex h-full min-h-[100vh] w-full flex-col items-start justify-start
          text-sm text-white md:text-base`,
          {
            'bg-[#171717]': themeMode === 'darkMode',
            'bg-[#F3F3F3]': themeMode === 'lightMode',
          },
        )}
      >
        <BrowseTopNavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
