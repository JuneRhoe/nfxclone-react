import clsx, { ClassValue } from 'clsx'
import { CSSProperties } from 'react'

type LoaderType = 'primary' | 'secondary'
type DisplayType = 'full' | 'inline'

interface Props {
  type?: LoaderType
  display?: DisplayType
  className?: ClassValue[] | string
  iconClassName?: ClassValue[] | string
  style?: CSSProperties | undefined
}

export default function Loader({
  type = 'primary',
  display = 'full',
  className,
  iconClassName,
  style,
}: Props) {
  return (
    <div
      className={clsx(className, 'flex items-center justify-center', {
        'bg-[#171717]': type === 'primary',
        'bg-white': type === 'secondary',
        'h-full min-h-[100vh] w-full': display === 'full',
        'h-full w-full bg-transparent': display === 'inline',
      })}
      style={style}
    >
      <div
        className={clsx(
          iconClassName,
          'animate-spin rounded-[50%] border-b-transparent',
          {
            'border-gray-100': type === 'primary',
            'border-gray-500': type === 'secondary',
            'h-20 w-20 border-10': display === 'full',
            'h-6 w-6 border-3': display === 'inline',
          },
        )}
      />
    </div>
  )
}
