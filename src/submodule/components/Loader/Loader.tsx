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
        'w-full h-full min-h-[100vh]': display === 'full',
        'w-full h-full bg-transparent': display === 'inline',
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
            'border-10 h-20 w-20': display === 'full',
            'border-3 h-6 w-6': display === 'inline',
          },
        )}
      />
    </div>
  )
}
