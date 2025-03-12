import React from 'react'
import clsx, { ClassValue } from 'clsx'
import { NavInfo, PageInfo } from './hooks'

export interface SliderInfo {
  itemSize: number
  navInfo: NavInfo
  pageInfo: PageInfo
  disableTransition: boolean
  setNavInfo: (navInfo: NavInfo) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setDiableTransition: (disabled: boolean) => void
}

export interface SliderItemSizeInfo {
  countPerPage: number
  itemSize: number
}

interface Props {
  children: (sliderInfo: SliderInfo) => React.ReactNode
  itemSize: number
  navInfo: NavInfo
  pageInfo: PageInfo
  disableTransition: boolean
  className?: ClassValue[] | string
  setNavInfo: (navInfo: NavInfo) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setDiableTransition: (disabled: boolean) => void
}

export default function Slider({
  children,
  itemSize,
  navInfo,
  pageInfo,
  disableTransition,
  className,
  setNavInfo,
  setPageInfo,
  setDiableTransition,
}: Props) {
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {children({
        itemSize,
        navInfo,
        pageInfo,
        disableTransition,
        setNavInfo,
        setPageInfo,
        setDiableTransition,
      })}
    </div>
  )
}
