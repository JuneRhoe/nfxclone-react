import { useMediaQueryXS } from '@/submodule/hooks'
import NavTapRegular from './components/NavTapRegular'
import NavTapMobile from './components/NavTapMobile'

export default function NavTap() {
  const isScreenXS = useMediaQueryXS()

  return (
    <div className="flex h-full items-center gap-4">
      {isScreenXS ? <NavTapMobile /> : <NavTapRegular />}
    </div>
  )
}
