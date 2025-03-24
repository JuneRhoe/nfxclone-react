import { useCookies } from "react-cookie"
import { UserCookieInfo } from "@/mock/mock-data-definitions";

export function useUserCookie() {
  const [cookies, setCookies, removeCookies] = useCookies<'userId' | 'authToken', UserCookieInfo>(['userId', 'authToken']);

  return {
    storedUserId: cookies.userId?.trim(),
    storedPassword: cookies.userPassword?.trim(),
    setUserIdCookie: (userId: string) => setCookies('userId', userId, { maxAge: 60 * 60 * 12, path: '/' }),
    setAuthTokenCookie: (authToken: string) => setCookies('authToken', authToken, { maxAge: 60 * 60 * 12, path: '/' }),
    removeUserIdCookie: () => removeCookies('userId'),
    removeAuthTokenCookie: () => removeCookies('authToken')
  }
}
