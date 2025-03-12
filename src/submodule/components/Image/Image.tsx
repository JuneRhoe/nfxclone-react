import clsx, { ClassValue } from 'clsx'
import { ImgHTMLAttributes, useState } from 'react'

interface Props {
  src: string
  className?: ClassValue[] | string
  imgClassName?: ClassValue[] | string
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  children?: React.ReactNode
}

export default function Image({
  src,
  className,
  imgClassName,
  imgProps,
  children,
}: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className={clsx(className, 'h-full relative')}>
      {!isImageLoaded && (
        <div className="absolute w-full h-full top-0 left-0">{children}</div>
      )}
      <img
        src={src}
        loading="lazy"
        {...imgProps}
        className={clsx(imgClassName, 'h-full')}
        onLoad={(e) => {
          setIsImageLoaded(true)
          imgProps?.onLoad?.(e)
        }}
      />
    </div>
  )
}
