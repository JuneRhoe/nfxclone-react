import React from 'react'
import clsx, { ClassValue } from 'clsx'
import { NavInfo, PageInfo, useSlider } from './hooks'

export interface SliderInfo {
  navInfo: NavInfo
  pageInfo: PageInfo
  itemSize: number
  disableTransition: boolean
  setNavInfo: (navInfo: NavInfo) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setDiableTransition: (disabled: boolean) => void
}

export interface SliderItemSizeInfo {
  itemSize: number
  countPerPage: number
}

interface Props<TData, TDataArray extends TData[]> {
  children: (sliderInfo: SliderInfo) => React.ReactNode
  data: TDataArray | null
  itemSize: number
  countPerPage: number
  className?: ClassValue[] | string
  onPageInfoUpdated?: (pageInfo: PageInfo) => void
}

export default function Slider<TData, TDataArray extends TData[]>({
  children,
  data,
  itemSize,
  countPerPage,
  className,
  onPageInfoUpdated,
}: Props<TData, TDataArray>) {
  const {
    navInfo,
    pageInfo,
    disableTransition,
    setNavInfo,
    setPageInfo,
    setDiableTransition,
  } = useSlider<TData, TDataArray>(
    data,
    itemSize,
    countPerPage,
    onPageInfoUpdated,
  )

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {children({
        navInfo,
        pageInfo,
        itemSize,
        disableTransition,
        setNavInfo,
        setPageInfo,
        setDiableTransition,
      })}
    </div>
  )
}
