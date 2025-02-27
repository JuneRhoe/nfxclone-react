import { Outlet } from 'react-router'
import BrowseTopNavBar from './components/BrowseTopNavBar/BrowseTopNavBar'

export default function Browse() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start text-xl">
      <BrowseTopNavBar />
      <Outlet />
    </div>
  )
}
