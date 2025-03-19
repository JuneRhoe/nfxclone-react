import { Outlet } from 'react-router'
import BrowseTopNavBar from './components/BrowseTopNavBar/BrowseTopNavBar'
import clsx from 'clsx'
import ScrollToTop from '@/submodule/components/ScrollToTop/ScrollToTop'
import Footer from '../Footer/Footer'
import { useAppSelector } from '../store/hooks'
import { selectThemeMode } from '../store/themeSlice'
import { useCheckUserInfo } from '../App/components/AppMain/hooks'
import { rootPath } from '@/routes'

export default function Browse() {
  const { isSignedIn } = useCheckUserInfo(rootPath, false)
  const themeMode = useAppSelector(selectThemeMode)

  if (!isSignedIn) {
    return null
  }

  return (
    <>
      <ScrollToTop />
      <div
        className={clsx(
          `flex h-full min-h-[100vh] w-full flex-col items-start justify-start relative
          text-white text-sm md:text-base`,
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
