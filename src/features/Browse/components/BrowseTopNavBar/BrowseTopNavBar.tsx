import nfxcloneLogo from '@/assets/images/logo.png'
import { useScrollPos } from '@/submodule/hooks'
import clsx from 'clsx'
import Image from '@/submodule/components/Image/Image'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import { browsePath } from '@/routes'
import { useLocation } from 'react-router'
import { getSubTitle } from './utils'
import NavTap from './components/NavTap/NavTap'
import UserMenu from './components/UserMenu/UserMenu'

export default function BrowseTopNavBar() {
  const { scrollPosY } = useScrollPos()
  const { pathname } = useLocation()

  const isScrollTop = scrollPosY === 0
  const isBrowseMain = pathname === browsePath

  const selectedPath = pathname.split('/').pop() || ''

  return (
    <div
      className={clsx('w-full sticky top-0 bg-transparent z-20', {
        'h-[6rem] md:h-[7.5rem]': !isBrowseMain,
      })}
    >
      <div className="flex h-[3rem] md:h-[4.5rem] w-full items-center">
        <div
          className={clsx(
            'absolute top-0 w-full h-full z-0 bg-[#171717] transition-opacity duration-400 ',
            {
              'opacity-100': !isScrollTop && isBrowseMain,
              'opacity-0': isScrollTop && isBrowseMain,
            },
          )}
        />
        <div
          className={clsx(
            `absolute top-0 w-full h-full z-0 transition-opacity duration-400 bg-linear-to-b
            from-[#171717] to-transparent`,
          )}
        />
        <div
          className="flex justify-between items-center w-full h-full relative px-3 py-3 gap-2 md:px-8
            md:py-4"
        >
          <div className="flex items-center gap-4 md:gap-10 h-full min-w-fit">
            <LinkButton className="h-full" to={browsePath}>
              <Image className="min-w-12" src={nfxcloneLogo} />
            </LinkButton>
            <NavTap />
          </div>
          <UserMenu />
        </div>
      </div>
      {!isBrowseMain && (
        <div className="relative px-3 py-1 md:px-8 md:py-1 font-extrabold text-xl md:text-4xl">
          {getSubTitle(selectedPath)}
        </div>
      )}
    </div>
  )
}
