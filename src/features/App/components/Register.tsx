import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/submodule/components/Button/Button'
import { UserInput } from '@/mock/mock-data-definitions'
import { MIN_LENGTH_USER_ID, MIN_LENGTH_USER_PASSWORD } from '@/mock/mock-data'
import InputField from '@/submodule/components/Input/InputField'
import { isAlphaNumbericAt } from '@/submodule/utils'
import { useRegister } from '../hooks'
import { useUserCookie } from '@/features/hooks'
import { useAppDispatch, useAppSelector } from '@/features/store/hooks'
import { selectThemeMode, setThemeMode } from '@/features/store/themeSlice'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  const { storedUserId } = useUserCookie()
  const { register, handleSubmit, formState, getValues, setError } =
    useForm<UserInput>({
      defaultValues: { userId: storedUserId },
    })
  const { isQueryLoading, onRegister } = useRegister(setError)

  useEffect(() => {
    dispatch(setThemeMode('lightMode'))

    return () => {
      dispatch(setThemeMode('darkMode'))
    }
  }, [dispatch, themeMode])

  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-[#737373]">
      <form
        onSubmit={handleSubmit((userInput) => {
          onRegister(userInput)
        })}
        className="flex flex-col gap-4 items-start justify-center sm:w-100 sm:p-0 w-full px-6"
      >
        <div className="font-extrabold text-3xl text-gray-800 pb-5">
          Create a password to start your membership
        </div>
        <InputField<UserInput, 'userId'>
          className="w-full"
          type="secondary"
          label="User ID"
          size="lg"
          mapErrorMsg={
            new Map([
              ['required', 'Please enter a valid user ID.'],
              ['validString', 'Please enter a valid user ID.'],
              [
                'minLength',
                `User ID must be at least ${MIN_LENGTH_USER_ID} characters long.`,
              ],
              [
                'Duplicated',
                'That user ID is already taken. Please try another.',
              ],
            ])
          }
          inputProps={{ type: 'text' }}
          formRegisterReturn={register('userId', {
            required: true,
            minLength: MIN_LENGTH_USER_ID,
            validate: { validString: isAlphaNumbericAt },
          })}
          formState={formState}
          getValues={getValues}
        />
        <InputField<UserInput, 'userPassword'>
          className="w-full"
          type="secondary"
          label="Password"
          size="lg"
          mapErrorMsg={
            new Map([
              ['required', 'Please enter a valid password.'],
              [
                'minLength',
                `Password must be at least ${MIN_LENGTH_USER_PASSWORD} characters long.`,
              ],
            ])
          }
          inputProps={{ type: 'password' }}
          formRegisterReturn={register('userPassword', {
            required: true,
            minLength: MIN_LENGTH_USER_PASSWORD,
          })}
          formState={formState}
          getValues={getValues}
        />
        <Button
          size="xl"
          className="w-full mt-4"
          loading={isQueryLoading}
          buttonProps={{ type: 'submit', disabled: isQueryLoading }}
        >
          Register
        </Button>
      </form>
    </div>
  )
}
