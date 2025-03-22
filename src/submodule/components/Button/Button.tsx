import clsx, { ClassValue } from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import Loader from '../Loader/Loader'

type ButtonType = 'primary' | 'secondary' | 'solid' | 'simple'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  children: React.ReactNode
  type?: ButtonType
  size?: ButtonSize
  className?: ClassValue[] | string
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  loading?: boolean
}

export default function Button({
  children,
  type = 'primary',
  size = 'md',
  className,
  buttonProps,
  loading,
}: Props) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        `flex cursor-pointer items-center justify-center rounded-md px-4 shadow-md
        transition-[background-color] duration-200 outline-0 select-none min-w-fit`,
        {
          'h-[1rem] text-xs font-normal': size === 'xs',
          'h-[1.8rem] text-sm font-normal': size === 'sm',
          'h-[2rem] text-sm font-semibold': size === 'md',
          'h-[2.625rem] text-base font-bold': size === 'lg',
          'h-[3.25rem] text-base font-extrabold': size === 'xl',
          'text-white':
            (type === 'primary' || type === 'secondary') &&
            !buttonProps?.disabled,
          'bg-[#E50914]': type === 'primary' && !buttonProps?.disabled,
          'hover:bg-[#C11119]': type === 'primary' && !buttonProps?.disabled,
          'bg-[#ec3c45]': type === 'primary' && buttonProps?.disabled,
          'bg-[#5D5D5D]': type === 'secondary' && !buttonProps?.disabled,
          'hover:bg-[#3D3D3D]': type === 'secondary' && !buttonProps?.disabled,
          'bg-[#6D6D6D]': type === 'secondary' && buttonProps?.disabled,
          'text-gray-400': type === 'secondary' && buttonProps?.disabled,
          'text-black': type === 'solid' && !buttonProps?.disabled,
          'bg-white': type === 'solid' && !buttonProps?.disabled,
          'hover:bg-[#C0C0C0]': type === 'solid' && !buttonProps?.disabled,
          'bg-[#808080]': type === 'solid' && buttonProps?.disabled,
          'text-gray-600': type === 'solid' && buttonProps?.disabled,
        },
      )}
    >
      {loading ? <Loader type="primary" display="inline" /> : children}
    </button>
  )
}
