import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserInput } from '@/mock/mock-data-definitions'
import { MIN_LENGTH_USER_ID, MIN_LENGTH_USER_PASSWORD } from '@/mock/mock-data'
import Button from '@/submodule/components/Button/Button'
import InputField from '@/submodule/components/Input/InputField'
import { useSignInQuery } from '../hooks'
import { useUserCookie } from '@/features/hooks'
import LinkText from '@/submodule/components/LinkText/LinkText'
import { PATH_SIGN_UP } from '@/route/routes'

export default function SignIn() {
  const { storedUserId } = useUserCookie()
  const { isQueryLoading, isValidUser, onSignIn, onTestIdSignIn } =
    useSignInQuery()
  const { formState, register, getValues, setFocus, handleSubmit } =
    useForm<UserInput>({
      defaultValues: { userId: storedUserId },
    })
  const [isTestSignIn, setIsTestSignIn] = useState(false)

  const isLoading =
    formState.isLoading || formState.isSubmitting || isQueryLoading

  return (
    <form
      onSubmit={handleSubmit(onSignIn)}
      className="mt-0 flex h-full w-full flex-col gap-6 bg-black opacity-100 px-6 pt-20
        text-white sm:h-fit sm:pt-10 sm:pb-12 sm:w-[28.5rem] sm:px-12 sm:opacity-80"
    >
      <div className="text-3xl font-extrabold pb-3">Sign In</div>
      <InputField<UserInput, 'userId'>
        label="User ID"
        size="lg"
        mapErrorMsg={
          new Map([
            ['required', 'Please enter a valid user ID.'],
            [
              'minLength',
              `User ID must be at least ${MIN_LENGTH_USER_ID} characters long.`,
            ],
          ])
        }
        inputProps={{ type: 'text' }}
        formRegisterReturn={register('userId', {
          required: true,
          minLength: MIN_LENGTH_USER_ID,
        })}
        formState={formState}
        getValues={getValues}
      />
      <InputField<UserInput, 'userPassword'>
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
        setFocus={setFocus}
      />
      <Button
        size="lg"
        buttonProps={{ type: 'submit', disabled: isLoading && !isTestSignIn }}
        loading={isLoading && !isTestSignIn}
      >
        Sign In
      </Button>
      <div className="flex w-full justify-center">OR</div>
      <Button
        type="secondary"
        size="lg"
        buttonProps={{
          type: 'button',
          disabled: isLoading && isTestSignIn,
          onClick: () => {
            setIsTestSignIn(true)
            onTestIdSignIn()
          },
        }}
        loading={isLoading && isTestSignIn}
      >
        Sign In with TEST ID
      </Button>
      <div className="flex gap-2 text-base flex-wrap">
        <div>New to NetflixClone?</div>
        <LinkText to={PATH_SIGN_UP}>
          <div className="font-bold">Sign Up now.</div>
        </LinkText>
      </div>

      {!isValidUser && !isLoading && formState.isSubmitSuccessful && (
        <div className="border-1 bg-[#d89d31] p-3 text-base text-black rounded-md">
          <span className="font-extrabold">
            Account information is not correct.
          </span>
          <br />
          Please try again.
        </div>
      )}
    </form>
  )
}
