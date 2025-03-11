import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { PageInfo } from '@/submodule/components/Slider/hooks'

interface Props {
  pageInfo: PageInfo | null
}

export default function MediaSliderNavigator({ pageInfo }: Props) {
  const [navItems, setNavItems] = useState<number[]>([])

  useEffect(() => {
    if (!pageInfo?.totalPage) {
      return
    }

    setNavItems(Array.from(Array(pageInfo.totalPage).keys()))
  }, [navItems.length, pageInfo?.totalPage])

  if (!pageInfo) {
    return null
  }

  return (
    <div className="flex gap-1 pr-2">
      {navItems.map((index) => (
        <div
          key={index}
          className={clsx('w-5 h-1 transition-colors duration-250', {
            'bg-gray-600': pageInfo.curPage < index,
            'bg-gray-50': pageInfo.curPage >= index,
          })}
        />
      ))}
    </div>
  )
}
