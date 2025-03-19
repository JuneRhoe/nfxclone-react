import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { To, useNavigate } from "react-router"
import { UserCookieInfo, UserInfo, UserInput } from "@/mock-data-definitions"
import { browsePath, registerPath } from "@/routes"
import { useTackstackQuery, useTanstackMutation } from "@/submodule/tanstack/hooks"
import { mutationFunction, queryFunction } from "@/submodule/tanstack/utils"
import { encrypt } from "@/submodule/utils"
import { UseFormSetError } from "react-hook-form"
import { useUserCookie } from "@/features/hooks"
import { QUERY_KEY_CHECK_USER_INFO, QUERY_KEY_USER_INFO } from "@/submodule/tanstack/queryKeys"
import { useAppDispatch, useAppSelector } from "@/features/store/hooks"
import { selectUserInfo, setUserInfo } from "@/features/store/userInfoSlice"

export function useQueryUserInfo(paramUserId: string, paramUserPassword: string) {
  const dispatch = useAppDispatch()

  // ToDo: Temporary test code due to the mockapi limitation

  const { isLoading: isQueryLoading, status, data } = useTackstackQuery<UserInfo[]>(
    [QUERY_KEY_USER_INFO, paramUserId, paramUserPassword],
    async () => {
      const response = await queryFunction('users', [
        { name: 'userId', value: paramUserId },
        { name: 'userPassword', value: paramUserPassword },
      ])

      return await response?.json()
    },
    !!paramUserId && !!paramUserPassword
  )

  const userInfoArray: UserInfo[] = status === 'success' && Array.isArray(data) ? data : []

  const signedInUser = userInfoArray.find(
    ({ userId, userPassword }) =>
      userId?.toLowerCase() === paramUserId.toLowerCase() && userPassword === paramUserPassword
  )

  useEffect(() => {
    if (!signedInUser || isQueryLoading) {
      return
    }

    dispatch(setUserInfo(signedInUser))
  }, [dispatch, isQueryLoading, signedInUser])

  return { isQueryLoading, signedInUser }
}

export function useSignInQuery() {
  const navigate = useNavigate()
  const { setUserIdCookie, setAuthTokenCookie } = useUserCookie()
  const [userInput, setUserInput] = useState<UserInput | null>(null)

  const userInputId = userInput?.userId || ''
  const userInputPassword = userInput?.userPassword || ''

  const { isQueryLoading, signedInUser } = useQueryUserInfo(userInputId, userInputPassword)

  useEffect(() => {
    if (!signedInUser || isQueryLoading) {
      return
    }

    // ToDo: set fake authToken due to the mockapi limitation
    setUserIdCookie(signedInUser.userId)
    setAuthTokenCookie(signedInUser.userPassword)

    navigate(browsePath)
  }, [isQueryLoading, navigate, setAuthTokenCookie, setUserIdCookie, signedInUser])

  const onSignIn = (userInput: UserInput) => {
    setUserInput({
      userId: userInput.userId.trim(),
      userPassword: encrypt(userInput.userPassword.trim()),
    })
  }

  const onTestIdSignIn = () => {
    setUserInput({
      userId: process.env.TESTID_KEY || '',
      userPassword: encrypt(process.env.TESTPD_KEY || ''),
    })
  }
        
  return { isQueryLoading, isValidUser: !!signedInUser, onSignIn, onTestIdSignIn }
}

export function useCheckUserInfo(redirectTo?: To, checkValid?: boolean) {
  const userInfo = useAppSelector(selectUserInfo)
  const navigate = useNavigate()
  const [cookies] = useCookies<'userId' | 'authToken', UserCookieInfo>([
    'userId',
    'authToken'
  ])

  // ToDo: test logic due to the mockapi limitation

  const storedUserId = userInfo?.userId || cookies.userId || ''
  const storedUserPassword = userInfo?.userPassword || cookies.authToken || ''

  const { isQueryLoading, signedInUser } = useQueryUserInfo(storedUserId, storedUserPassword)

  const isSignedIn = !!signedInUser

  useEffect(() => {
    if (isQueryLoading) {
      return
    }

    if (!redirectTo) {
      return
    }

    if (!(isSignedIn === checkValid)) {
      return
    }

    navigate(redirectTo)
  }, [isSignedIn, navigate, redirectTo, checkValid, isQueryLoading])

  return { isSignedIn, isQueryLoading }
}

export function useSignUp() {
  const navigate = useNavigate()
  const { setUserIdCookie } = useUserCookie()

  const onSignUp = (userInput: UserInput) => {
    setUserIdCookie(userInput.userId.trim())
    navigate(registerPath)
  }

  return { onSignUp }
}

export function useRegister(setError: UseFormSetError<UserInput>) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { setUserIdCookie, setAuthTokenCookie } = useUserCookie()
  const [userInput, setUserInput] = useState<UserInput | null>(null)

  const userInputId = userInput?.userId || ''

  // Temporary code due to the mockapi limitation. This is unnecessary if there is proper API.

  const { isLoading: isQueryLoading, status: queryStatus, data: queryData } = useTackstackQuery<UserInput[]>(
    [QUERY_KEY_CHECK_USER_INFO, userInputId],
    async () => {
      const response = await queryFunction('users', [
        { name: 'userId', value: userInputId || '' }
      ])

      return await response?.json()
    },
    !!userInputId
  )

  const isUserIdTaken = Array.isArray(queryData) && queryStatus === 'success' &&
    queryData?.some((userInfo) =>
      userInfo.userId?.toLowerCase() === userInputId?.toLowerCase()
    )
  
  useEffect(() => {
    if (!isUserIdTaken) {
      return
    }

    setUserInput(null)
    setError('userId', { type: 'Duplicated' })
  }, [isUserIdTaken, isQueryLoading, queryStatus, setError])

  // Test code due to the mockapi limitation.

  const addUserMutation = useTanstackMutation(
    (newUser: UserInput) => mutationFunction<UserInput>('users', newUser, 'POST'),
    async (resposne, error) => {
      if (error) {
        console.error(error)

        return
      }

      let registeredUserInfo: UserInfo | null = null;

      try {
        registeredUserInfo = await resposne?.json()
      } catch (e) {
        console.error(e)
      }

      if (!registeredUserInfo) {
        return
      }

      dispatch(setUserInfo(registeredUserInfo))
      
      setUserIdCookie(registeredUserInfo.userId)
      setAuthTokenCookie(registeredUserInfo.userPassword)

      navigate(browsePath)
    },
  )

  useEffect(() => {
    if (!userInput || isUserIdTaken || queryStatus !== 'success' ||
      addUserMutation.isPending || addUserMutation.isSuccess) {
      return
    }

    addUserMutation.mutate(userInput)
  }, [userInput, isUserIdTaken, queryStatus, addUserMutation])

  const onRegister = (userInput: UserInput) => {
    setUserInput({
      userId: userInput.userId.trim(),
      userPassword: encrypt(userInput.userPassword.trim()),
    })
  }

  return { isQueryLoading, onRegister }
}