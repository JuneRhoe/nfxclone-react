import clsx, { ClassValue } from 'clsx'
import { CSSProperties } from 'react'

interface Props {
  children: React.ReactNode
  className?: ClassValue[] | string
  style?: CSSProperties | undefined
}

export default function SliderItem({ children, className, style }: Props) {
  return (
    <div
      className={clsx(
        className,
        'inline-block cursor-pointer whitespace-normal',
      )}
      style={style}
    >
      {children}
    </div>
  )
}
