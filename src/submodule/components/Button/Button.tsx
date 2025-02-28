import clsx, { ClassValue } from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type ButtonType = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg' | 'xl'

interface Props {
  children: React.ReactNode
  type?: ButtonType
  size?: ButtonSize
  className?: ClassValue[] | string
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export default function Button({
  children,
  type = 'primary',
  size = 'md',
  className,
  buttonProps,
}: Props) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        [
          `flex cursor-pointer items-center justify-center rounded-md px-4 text-white
          shadow-md transition-[background-color] duration-200 select-none`,
        ],
        {
          'bg-[#E50914]': type === 'primary',
          'hover:bg-[#C11119]': type === 'primary',
          'bg-[#80808066]': type === 'secondary',
          'hover:bg-[#8080804d]': type === 'secondary',
          'h-[2rem] text-sm font-semibold': size === 'md',
          'h-[2.625rem] text-base font-bold': size === 'lg',
          'h-[3.25rem] text-base font-extrabold': size === 'xl',
        },
      )}
    >
      {children}
    </button>
  )
}
