import { useNavigate } from "react-router"
import { useUserCookie } from "../hooks"
import { rootPath } from "@/routes"
import { removeUserInfo } from "../store/userInfoSlice"
import { useAppDispatch } from "../store/hooks"

export function useSignOut() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { removeUserIdCookie, removeAuthTokenCookie } = useUserCookie()

  const signOut = () => {
    dispatch(removeUserInfo())

    removeUserIdCookie()
    removeAuthTokenCookie()

    navigate(rootPath)
  }

  return { signOut }
}
