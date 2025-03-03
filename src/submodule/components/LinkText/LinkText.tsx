import clsx, { ClassValue } from 'clsx'
import { To, useNavigate } from 'react-router'

interface Props {
  children: React.ReactNode
  to: To
  className?: ClassValue[] | string
}

export default function LinkText({ children, to, className }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className={clsx(
        className,
        'flex cursor-pointer items-center justify-center select-none hover:underline',
      )}
      onClick={() => navigate(to)}
    >
      {children}
    </div>
  )
}
