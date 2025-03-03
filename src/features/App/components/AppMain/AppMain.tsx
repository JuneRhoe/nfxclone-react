import Footer from '@/features/Footer/Footer'
import bgHome from '@/assets/image/home/bg-home.jpg'
import AppTopNavBar from './components/AppTopNavBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Register from './components/Register'
import clsx from 'clsx'
import { useContext } from 'react'
import { ThemeInfoContext } from '../../context'
import { useCheckUserInfo } from './hooks'
import { browsePath } from '@/routes'

export type DisplayType = 'signIn' | 'signUp' | 'register'

export interface AppMainProps {
  displayType: DisplayType
}

export default function AppMain({ displayType }: AppMainProps) {
  const { isSignedIn } = useCheckUserInfo(browsePath, true)
  const { themeType } = useContext(ThemeInfoContext)

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
    <div
      className={clsx(
        'flex h-full min-h-[100vh] w-full flex-col items-start justify-start',
        {
          'bg-[#202020]': themeType === 'darkMode',
          'bg-[#F3F3F3]': themeType === 'lightMode',
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
          className={clsx('relative flex h-fit w-full flex-col items-center', {
            'xl:w-[80%] 2xl:w-[70%]': themeType === 'darkMode',
          })}
        >
          <AppTopNavBar displayType={displayType} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
