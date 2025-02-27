import nfxcloneLogo from '@/assets/image/logo.png'
import { rootPath, signUpPath } from '@/routes'
import { useNavigate } from 'react-router'
import { AppMainProps } from '../AppMain'
import { useContext } from 'react'
import { ThemeInfoContext } from '@/features/App/context'
import clsx from 'clsx'

export default function AppTopNavBar({ displayType }: AppMainProps) {
  const { themeType } = useContext(ThemeInfoContext)
  const navigate = useNavigate()

  return (
    <div
      className={clsx({
        'absolute my-6 flex h-[6rem] w-full justify-between px-6 sm:my-8 sm:px-8':
          themeType === 'darkMode',
        'flex w-full items-center justify-between border-b-1 border-b-gray-200 p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6':
          themeType === 'lightMode',
      })}
    >
      <img
        className="h-[50%] sm:h-[70%] md:h-[80%] lg:h-[100%]"
        src={nfxcloneLogo}
      />
      <div className="text-white">
        {displayType === 'signIn' && (
          <button
            className="bg-red-700"
            onClick={() => {
              navigate(signUpPath)
            }}
          >
            Sign Up
          </button>
        )}
        {(displayType === 'signUp' || displayType === 'register') && (
          <button
            className="bg-red-700"
            onClick={() => {
              navigate(rootPath)
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}
