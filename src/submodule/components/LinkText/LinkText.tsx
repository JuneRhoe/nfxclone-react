import clsx, { ClassValue } from 'clsx'
import { CSSProperties, useState } from 'react'
import { To, useNavigate } from 'react-router'

interface Props {
  children: React.ReactNode
  to: To
  hoverStyles?: (isHover: boolean) => CSSProperties | undefined
  className?: ClassValue[] | string
}

export default function LinkText({
  children,
  to,
  hoverStyles = (isHover: boolean) => ({
    textDecorationLine: isHover ? 'underline' : 'none',
  }),
  className,
}: Props) {
  const navigate = useNavigate()
  const [isHover, setHover] = useState(false)

  return (
    <div
      className={clsx(
        className,
        `flex cursor-pointer items-center justify-center select-none transition-all
        duration-300`,
      )}
      style={hoverStyles?.(isHover)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => navigate(to)}
    >
      {children}
    </div>
  )
}
