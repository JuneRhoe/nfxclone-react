import { Outlet } from 'react-router'

export default function Main() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start text-xl">
      ====== TOP NAV =====
      <Outlet />
    </div>
  )
}
