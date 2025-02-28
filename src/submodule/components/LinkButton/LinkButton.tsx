import clsx, { ClassValue } from 'clsx'
import { ButtonHTMLAttributes } from 'react'
import { To, useNavigate } from 'react-router'

interface Props {
  children: React.ReactNode
  to: To
  className?: ClassValue[] | string
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

export default function LinkButton({
  children,
  to,
  className,
  buttonProps,
}: Props) {
  const navigate = useNavigate()

  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        'flex cursor-pointer items-center justify-center select-none',
      )}
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  )
}
