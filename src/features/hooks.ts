import { useCookies } from "react-cookie"
import { UserInput } from "@/data-definitions"

export function useUserCookie() {
  const [cookies, setCookies, removeCookies] = useCookies<'userId' | 'authToken', UserInput>(['userId', 'authToken']);

  return {
    storedUserId: cookies.userId?.trim(),
    storedPassword: cookies.userPassword?.trim(),
    setUserIdCookie: (userId: string) => setCookies('userId', userId, { maxAge: 60 * 60 * 12 }),
    setAuthTokenCookie: (authToken: string) => setCookies('authToken', authToken, { maxAge: 60 * 60 * 12 }),
    removeUserIdCookie: () => removeCookies('userId'),
    removeAuthTokenCookie: () => removeCookies('authToken')
  }
}
