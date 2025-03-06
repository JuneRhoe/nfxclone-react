import { NavLink, NavLinkProps, To } from 'react-router'
import clsx, { ClassValue } from 'clsx'

export interface TabButtonProps {
  to: To
  children: React.ReactNode | ((isActive?: boolean) => React.ReactNode)
  onClick?: (to: To) => void
  activeClass?: ClassValue[] | string
  inActiveClass?: ClassValue[] | string
  className?: ClassValue[] | string
  navLinkProps?: Omit<NavLinkProps, 'to'> &
    React.RefAttributes<HTMLAnchorElement>
}

export default function TabButton({
  to,
  children,
  onClick,
  activeClass = '',
  inActiveClass = '',
  className,
  navLinkProps,
}: TabButtonProps) {
  return (
    <NavLink
      {...navLinkProps}
      to={to}
      className={({ isActive }) =>
        clsx(className, 'min-w-fit', isActive ? activeClass : inActiveClass)
      }
      onClick={() => onClick?.(to)}
    >
      {typeof children === 'function'
        ? ({ isActive }) => children(isActive)
        : children}
    </NavLink>
  )
}
