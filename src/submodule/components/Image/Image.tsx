import clsx, { ClassValue } from 'clsx'
import { ImgHTMLAttributes, useState } from 'react'

interface Props {
  src: string
  ref?: React.RefObject<HTMLDivElement | null>
  fullWidth?: boolean
  fullHeight?: boolean
  className?: ClassValue[] | string
  imgClassName?: ClassValue[] | string
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  loader?: React.ReactNode
}

export default function Image({
  src,
  ref,
  fullWidth,
  fullHeight = true,
  className,
  imgClassName,
  imgProps,
  loader,
}: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div
      ref={ref}
      className={clsx(className, 'relative', {
        'w-full': fullWidth,
        'h-full': fullHeight,
      })}
    >
      {!isImageLoaded && loader && (
        <div className="absolute top-0 left-0 h-full w-full">{loader}</div>
      )}
      <img
        src={src}
        loading="lazy"
        {...imgProps}
        className={clsx(imgClassName, {
          'w-full': fullWidth,
          'h-full': fullHeight,
        })}
        onLoad={(e) => {
          setIsImageLoaded(true)
          imgProps?.onLoad?.(e)
        }}
      />
    </div>
  )
}
