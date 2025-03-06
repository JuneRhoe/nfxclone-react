import { Outlet } from 'react-router'
import BrowseTopNavBar from './components/BrowseTopNavBar/BrowseTopNavBar'
import { useContext } from 'react'
import { ThemeInfoContext } from '../App/context'
import clsx from 'clsx'
import ScrollToTop from '@/submodule/components/ScrollToTop/ScrollToTop'
import Footer from '../Footer/Footer'

export default function Browse() {
  const { themeType } = useContext(ThemeInfoContext)

  return (
    <>
      <ScrollToTop />
      <div
        className={clsx(
          `flex h-full min-h-[100vh] w-full flex-col items-start justify-start relative
          text-white text-sm md:text-base`,
          {
            'bg-[#171717]': themeType === 'darkMode',
            'bg-[#F3F3F3]': themeType === 'lightMode',
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
