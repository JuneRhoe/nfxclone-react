import { useRef } from 'react'
import { useLocation } from 'react-router'
import clsx from 'clsx'
import nfxcloneLogo from '@/assets/images/logo.png'
import { useScrollPos } from '@/submodule/hooks'
import Image from '@/submodule/components/Image/Image'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import { PATH_BROWSE } from '@/route/routes'
import { getSubTitle } from './utils'
import NavTap from './components/NavTap/NavTap'
import UserMenu from './components/UserMenu/UserMenu'
import { SearchInput } from './components/SearchInput/SearchInput'

export default function BrowseTopNavBar() {
  const navTapRef = useRef<HTMLDivElement>(null)
  const { scrollPosY } = useScrollPos()
  const { pathname } = useLocation()

  const isScrollTop = scrollPosY === 0
  const isBrowseMain = pathname === PATH_BROWSE

  return (
    <div
      className={clsx('sticky top-0 z-20 w-full bg-transparent', {
        'h-[6rem] md:h-[7.5rem]': !isBrowseMain,
      })}
    >
      <div className="flex h-[3rem] w-full items-center md:h-[4.5rem]">
        <div
          className={clsx(
            'absolute top-0 z-0 h-full w-full bg-[#171717] transition-opacity duration-400',
            {
              'opacity-100': !isScrollTop && isBrowseMain,
              'opacity-0': isScrollTop && isBrowseMain,
            },
          )}
        />
        <div
          className={clsx(
            `absolute top-0 z-0 h-full w-full bg-linear-to-b from-[#171717] to-transparent
            transition-opacity duration-400`,
          )}
        />
        <div
          className="relative flex h-full w-full items-center justify-between gap-2 px-4 py-3 md:px-8
            md:py-4"
        >
          <div
            ref={navTapRef}
            className="flex h-full min-w-fit items-center gap-4 md:gap-10"
          >
            <LinkButton className="h-full" to={PATH_BROWSE}>
              <Image className="min-w-12" src={nfxcloneLogo} />
            </LinkButton>
            <NavTap />
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <SearchInput navTapRef={navTapRef} />
            <UserMenu />
          </div>
        </div>
      </div>
      {!isBrowseMain && (
        <div className="relative px-3 py-1 text-xl font-extrabold md:px-8 md:py-1 md:text-4xl">
          {getSubTitle(pathname)}
        </div>
      )}
    </div>
  )
}
