import nfxcloneLogo from '@/assets/images/logo.png'
import { rootPath, signUpPath } from '@/routes'
import { useNavigate } from 'react-router'
import { AppMainProps } from '../AppMain'
import { useContext } from 'react'
import { ThemeInfoContext } from '@/features/App/context'
import clsx from 'clsx'
import Button from '@/submodule/components/Button/Button'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import Image from '@/submodule/components/Image/Image'

export default function AppTopNavBar({ displayType }: AppMainProps) {
  const { themeType } = useContext(ThemeInfoContext)
  const navigate = useNavigate()

  return (
    <div
      className={clsx({
        ['absolute my-6 flex h-[4.5rem] w-full justify-between px-6 sm:my-8 sm:px-8']:
          themeType === 'darkMode',
        [`flex w-full items-center border-b-1 justify-between border-b-gray-200 p-1 sm:p-2
        md:p-3 lg:p-4 xl:p-5 2xl:p-6`]: themeType === 'lightMode',
      })}
    >
      <LinkButton
        className="h-[50%] sm:h-[70%] md:h-[80%] lg:h-[100%]"
        to={rootPath}
      >
        <Image src={nfxcloneLogo} />
      </LinkButton>

      <div className="text-white">
        {displayType === 'signIn' && (
          <Button buttonProps={{ onClick: () => navigate(signUpPath) }}>
            Sign Up
          </Button>
        )}
        {(displayType === 'signUp' || displayType === 'register') && (
          <Button buttonProps={{ onClick: () => navigate(rootPath) }}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
