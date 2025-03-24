import { Navigate } from 'react-router'
import { useIsSignedUser } from '@/features/App/hooks'
import Loader from '@/submodule/components/Loader/Loader'

type PermissionCheckType = 'public' | 'private'

interface Props {
  redirectPath: string
  permissionCheck: PermissionCheckType
  children: React.ReactNode
}

export default function PermissionRedirect({
  redirectPath,
  permissionCheck,
  children,
}: Props) {
  const { isQueryLoading, isSignedIn } = useIsSignedUser()

  if (isQueryLoading) {
    return <Loader />
  }

  if (
    (isSignedIn && permissionCheck === 'public') ||
    (!isSignedIn && permissionCheck === 'private')
  ) {
    return <Navigate to={redirectPath} />
  }

  return <>{children}</>
}
