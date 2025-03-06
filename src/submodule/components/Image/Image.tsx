import clsx, { ClassValue } from 'clsx'
import { ImgHTMLAttributes } from 'react'

interface Props {
  src: string
  className?: ClassValue[] | string
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
}

export default function Image({ src, className, imgProps }: Props) {
  return (
    <img
      src={src}
      loading="lazy"
      {...imgProps}
      className={clsx(className, 'h-full')}
    />
  )
}
