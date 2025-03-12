import clsx from 'clsx'
import { PageInfo } from '@/submodule/components/Slider/hooks'
import { useMemo } from 'react'

interface Props {
  pageInfo: PageInfo | null
}

export default function MediaSliderNavigator({ pageInfo }: Props) {
  const navItems = useMemo(
    () => Array.from(Array(Number(pageInfo?.totalPage)).keys()),
    [pageInfo?.totalPage],
  )

  if (!pageInfo) {
    return null
  }

  const curPage = pageInfo.curPage < 0 ? 0 : pageInfo.curPage

  return (
    <div className="flex gap-0.5 pr-2">
      {navItems.map((index) => (
        <div
          key={index}
          className={clsx('w-4 h-0.5 transition-colors duration-200', {
            'bg-gray-600': curPage !== index,
            'bg-gray-50': curPage === index,
          })}
        />
      ))}
    </div>
  )
}
