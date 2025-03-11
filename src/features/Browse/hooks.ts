import { useNavigate } from "react-router"
import { useUserCookie } from "../hooks"
import { rootPath } from "@/routes"

export interface MediaPreviewMediaInfo {
  mediaMainImg: string
  mediaPreview: string
  mediaTitleImg: string
}

export function useSignOut() {
  const navigate = useNavigate()
  const { removeUserIdCookie, removeAuthTokenCookie } = useUserCookie()

  const signOut = () => {
    removeUserIdCookie()
    removeAuthTokenCookie()

    navigate(rootPath)
  }

  return { signOut }
}
