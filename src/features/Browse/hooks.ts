import { useNavigate } from 'react-router'
import { useUserCookie } from '../hooks'
import { PATH_ROOT } from '@/route/routes'
import { removeUserInfo } from '../store/userInfoSlice'
import { useAppDispatch } from '../store/hooks'

export function useSignOut() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { removeUserIdCookie, removeAuthTokenCookie } = useUserCookie()

  const signOut = () => {
    dispatch(removeUserInfo())

    removeUserIdCookie()
    removeAuthTokenCookie()

    navigate(PATH_ROOT)
  }

  return { signOut }
}
