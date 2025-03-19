import clsx, { ClassValue } from 'clsx'
import { CSSProperties, useState } from 'react'
import { Link, To } from 'react-router'

interface Props {
  children: React.ReactNode
  to: To
  target?: React.HTMLAttributeAnchorTarget | undefined
  hoverStyles?: (isHover: boolean) => CSSProperties | undefined
  className?: ClassValue[] | string
}

export default function LinkText({
  children,
  to,
  target,
  hoverStyles = (isHover: boolean) => ({
    textDecorationLine: isHover ? 'underline' : 'none',
  }),
  className,
}: Props) {
  const [isHover, setHover] = useState(false)

  return (
    <Link
      className={clsx(
        className,
        'flex cursor-pointer items-center justify-center select-none',
      )}
      style={hoverStyles?.(isHover)}
      to={to}
      target={target}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {children}
    </Link>
  )
}
