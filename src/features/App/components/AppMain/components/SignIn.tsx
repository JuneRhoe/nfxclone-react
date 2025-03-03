import {
  MIN_LENGTH_USER_ID,
  MIN_LENGTH_USER_PASSWORD,
  UserInput,
} from '@/data-definitions'
import Button from '@/submodule/components/Button/Button'
import InputField from '@/submodule/components/Input/InputField'
import { useForm } from 'react-hook-form'
import { useSignInQuery } from '../hooks'
import { useUserCookie } from '@/features/hooks'

export default function SignIn() {
  const { storedUserId } = useUserCookie()
  const { isQueryLoading, isValidUser, onSignIn } = useSignInQuery()
  const { formState, register, getValues, handleSubmit } = useForm<UserInput>({
    defaultValues: { userId: storedUserId },
  })

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
      />
      <Button
        size="lg"
        buttonProps={{ type: 'submit', disabled: isLoading }}
        loading={isLoading}
      >
        Sign In
      </Button>
      <div className="flex w-full justify-center">OR</div>
      <Button
        type="secondary"
        size="lg"
        buttonProps={{ type: 'button', onClick: () => {} }}
      >
        Sign In with TEST ID
      </Button>
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
