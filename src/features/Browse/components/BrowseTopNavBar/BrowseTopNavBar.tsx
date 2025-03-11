import nfxcloneLogo from '@/assets/images/logo.png'
import Button from '@/submodule/components/Button/Button'
import { useScrollPos } from '@/submodule/hooks'
import clsx from 'clsx'
import { useSignOut } from '../../hooks'
import Image from '@/submodule/components/Image/Image'
import LinkButton from '@/submodule/components/LinkButton/LinkButton'
import { browsePath } from '@/routes'
import { To, useLocation } from 'react-router'
import { useState } from 'react'
import { getSubTitle } from './utils'
import NavTap from './components/NavTap'

export default function BrowseTopNavBar() {
  const { signOut } = useSignOut()
  const { scrollPosY } = useScrollPos()
  const { pathname } = useLocation()
  const [selectedPath, setSelectedPath] = useState<To>('')

  const isScrollTop = scrollPosY === 0
  const isBrowseMain = pathname === browsePath

  return (
    <div
      className={clsx('w-full sticky top-0 bg-transparent z-10', {
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
            <NavTap onClickNavButton={setSelectedPath} />
          </div>
          <Button buttonProps={{ onClick: signOut }}>Sign Out</Button>
        </div>
      </div>
      {!isBrowseMain && (
        <div className="relative px-3 py-1 md:px-8 md:py-1 font-extrabold text-xl md:text-2xl">
          {getSubTitle(selectedPath)}
        </div>
      )}
    </div>
  )
}
