import nfxcloneLogo from '@/assets/images/logo.png'
import { PATH_REGISTER, PATH_ROOT, PATH_SIGN_UP } from '@/route/routes'
import { useLocation, useNavigate } from 'react-router'
import clsx from 'clsx'
import Button from '@/submodule/components/Button/Button'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import Image from '@/submodule/components/Image/Image'
import { useAppSelector } from '@/features/store/hooks'
import { selectThemeMode } from '@/features/store/themeSlice'

export default function AppTopNavBar() {
  const themeMode = useAppSelector(selectThemeMode)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div
      className={clsx({
        ['absolute my-6 flex h-[4.5rem] w-full justify-between px-6 sm:my-8 sm:px-8']:
          themeMode === 'darkMode',
        [`flex w-full items-center border-b-1 justify-between border-b-gray-200 p-1 sm:p-2
        md:p-3 lg:p-4 xl:p-5 2xl:p-6`]: themeMode === 'lightMode',
      })}
    >
      <LinkButton
        className="h-[50%] sm:h-[70%] md:h-[80%] lg:h-[100%]"
        to={PATH_ROOT}
      >
        <Image src={nfxcloneLogo} />
      </LinkButton>

      <div className="text-white">
        {pathname === PATH_ROOT && (
          <Button buttonProps={{ onClick: () => navigate(PATH_SIGN_UP) }}>
            Sign Up
          </Button>
        )}
        {(pathname === PATH_SIGN_UP || pathname === PATH_REGISTER) && (
          <Button buttonProps={{ onClick: () => navigate(PATH_ROOT) }}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
