import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { To, useNavigate } from "react-router"
import { UserInfo, UserInput } from "@/data-definitions"
import { browsePath, registerPath } from "@/routes"
import { useTackstackQuery, useTanstackMutation } from "@/submodule/tanstack/hooks"
import { mutationFunction, queryFunction } from "@/submodule/tanstack/utils"
import { encrypt } from "@/submodule/utils"
import { UseFormSetError } from "react-hook-form"
import { useUserCookie } from "@/features/hooks"
import { queryClient } from "@/submodule/tanstack/client"

export function useSignInQuery() {
  const navigate = useNavigate()
  const { setUserIdCookie, setAuthTokenCookie } = useUserCookie()
  const [userInput, setUserInput] = useState<UserInput | null>(null)

  const userInputId = userInput?.userId || ''
  const userInputPassword = userInput?.userPassword || ''

  const { isLoading: isQueryLoading, status, data } = useTackstackQuery<UserInput[]>(
    [userInputId, userInputPassword],
    async () => {
      const response = await queryFunction('users', [
        { name: 'userId', value: userInputId },
        { name: 'userPassword', value: userInputPassword },
      ])

      return await response?.json()
    },
    !!userInput
  )

  // ToDo: Temporary test code due to the mockapi limitation

  const isValidUser = Array.isArray(data) && status === 'success' &&
    data?.some((userInfo) =>
      userInfo.userId?.toLowerCase() === userInputId.toLowerCase() &&
      userInfo.userPassword === userInputPassword
    )

  useEffect(() => {
    if (!isValidUser || isQueryLoading) {
      return
    }

    // ToDo: set fake authToken due to the mockapi limitation
    setUserIdCookie(userInputId)
    setAuthTokenCookie(userInputPassword)

    navigate(browsePath)
  }, [isValidUser, isQueryLoading, setUserIdCookie, setAuthTokenCookie, userInputId, userInputPassword, navigate])

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
        
  return { isQueryLoading, isValidUser, onSignIn, onTestIdSignIn }
}

export function useCheckUserInfo(redirectTo?: To, checkValid?: boolean) {
  const navigate = useNavigate()
  const [cookies] = useCookies<'userId' | 'authToken', UserInfo>([
    'userId',
    'authToken'
  ])

  // ToDo: test logic due to the mockapi limitation

  const isSignedIn = !!cookies.authToken && !!cookies.userId

  useEffect(() => {
    if (!redirectTo) {
      return
    }

    if ((checkValid && !isSignedIn) || (!checkValid && isSignedIn)) {
      return
    }

    navigate(redirectTo)
  }, [isSignedIn, navigate, redirectTo, checkValid])

  return { isSignedIn }
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
  const { setUserIdCookie, setAuthTokenCookie } = useUserCookie()
  const [userInput, setUserInput] = useState<UserInput | null>(null)

  const userInputId = userInput?.userId || ''

  // Temporary code due to the mockapi limitation. This is unnecessary if there is proper API.

  const { isLoading: isQueryLoading, status: queryStatus, data: queryData } = useTackstackQuery<UserInput[]>(
    [userInputId],
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
    (newUser: UserInput) => mutationFunction<UserInput>('users', newUser),
    () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })

      if (!userInput) {
        return
      }

      setUserIdCookie(userInput.userId)
      setAuthTokenCookie(userInput.userPassword)

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