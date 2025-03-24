import clsx from 'clsx'
import { Outlet } from 'react-router'
import ScrollToTop from '@/submodule/components/ScrollToTop/ScrollToTop'
import { useAppSelector } from '../store/hooks'
import { selectThemeMode } from '../store/themeSlice'
import Footer from '../Footer/Footer'
import AppTopNavBar from './components/AppTopNavBar'
import bgHome from '@/assets/images/home/bg-home.jpg'

export default function App() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <>
      <ScrollToTop />
      <div
        className={clsx(
          'flex h-full min-h-[100vh] w-full flex-col items-start justify-start',
          {
            'bg-[#101010]': themeMode === 'darkMode',
            'bg-[#F3F3F3]': themeMode === 'lightMode',
          },
        )}
      >
        <div
          className={`relative flex h-[85vh] min-h-[37.5rem] w-full flex-col items-center
            sm:min-h-[45rem]`}
        >
          <div
            className={'absolute h-full w-full bg-cover bg-center opacity-50'}
            style={{ backgroundImage: `url(${bgHome})` }}
          />
          <div className="absolute flex h-full w-full flex-col items-center justify-center">
            <Outlet />
          </div>
          <div
            className={clsx(
              'relative flex h-fit w-full flex-col items-center',
              {
                'xl:w-[80%] 2xl:w-[70%]': themeMode === 'darkMode',
              },
            )}
          >
            <AppTopNavBar />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
