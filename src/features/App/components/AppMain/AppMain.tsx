import Footer from '@/features/Footer/Footer'
import bgHome from '@/assets/images/home/bg-home.jpg'
import AppTopNavBar from './components/AppTopNavBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Register from './components/Register'
import clsx from 'clsx'
import { useCheckUserInfo } from './hooks'
import { browsePath } from '@/routes'
import ScrollToTop from '@/submodule/components/ScrollToTop/ScrollToTop'
import { useAppSelector } from '@/features/store/hooks'
import { selectThemeMode } from '@/features/store/themeSlice'

export type DisplayType = 'signIn' | 'signUp' | 'register'

export interface AppMainProps {
  displayType: DisplayType
}

export default function AppMain({ displayType }: AppMainProps) {
  const { isSignedIn } = useCheckUserInfo(browsePath, true)
  const themeMode = useAppSelector(selectThemeMode)

  let mainContentFC: React.ReactNode = null

  switch (displayType) {
    case 'signIn':
      mainContentFC = <SignIn />
      break
    case 'signUp':
      mainContentFC = <SignUp />
      break
    case 'register':
      mainContentFC = <Register />
      break
  }

  if (isSignedIn) {
    return null
  }

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
            {mainContentFC}
          </div>
          <div
            className={clsx(
              'relative flex h-fit w-full flex-col items-center',
              {
                'xl:w-[80%] 2xl:w-[70%]': themeMode === 'darkMode',
              },
            )}
          >
            <AppTopNavBar displayType={displayType} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
