import clsx, { ClassValue } from 'clsx'
import { handleTransitionEnd, NavInfo, PageInfo } from '../hooks'

interface Props {
  children: React.ReactNode
  navInfo: NavInfo
  pageInfo: PageInfo
  itemSize: number
  disableTransition: boolean
  className?: ClassValue[] | string
  setNavInfo: (navInfo: NavInfo) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setDiableTransition: (disabled: boolean) => void
}

export default function SliderItemContainer({
  children,
  navInfo,
  pageInfo,
  itemSize,
  disableTransition,
  className,
  setNavInfo,
  setPageInfo,
  setDiableTransition,
}: Props) {
  return (
    <div
      className={clsx(
        'whitespace-nowrap ease-[cubic-bezier(0.5, 0, 0.1, 1)]',
        className,
      )}
      style={{
        transitionProperty: disableTransition ? 'none' : 'transform',
        transform: `translate3d(${navInfo.vectorX}, 0, 0)`,
        transitionDuration: disableTransition ? 'unset' : '900ms',
      }}
      onTransitionEnd={() => {
        handleTransitionEnd(
          itemSize,
          navInfo,
          pageInfo,
          setNavInfo,
          setPageInfo,
          setDiableTransition,
        )
      }}
    >
      {children}
    </div>
  )
}
