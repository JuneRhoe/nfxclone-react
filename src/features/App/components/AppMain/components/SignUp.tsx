import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Button from '@/submodule/components/Button/Button'
import { useForm } from 'react-hook-form'
import { MIN_LENGTH_USER_ID, UserInput } from '@/data-definitions'
import InputField from '@/submodule/components/Input/InputField'
import { isAlphaNumbericAt } from '@/submodule/utils'
import { useSignUp } from '../hooks'
import { useUserCookie } from '@/features/hooks'

export default function SignUp() {
  const { storedUserId } = useUserCookie()
  const { onSignUp } = useSignUp()
  const { register, handleSubmit, formState, getValues } = useForm<UserInput>({
    defaultValues: { userId: storedUserId },
  })

  const isFormLoading = formState.isLoading || formState.isSubmitting

  return (
    <form
      onSubmit={handleSubmit(onSignUp)}
      className="relative flex h-full w-full items-center justify-center text-white"
    >
      <div className="absolute z-0 h-full w-full bg-black opacity-50" />
      <div className="z-1 flex items-start justify-center gap-2 h-[6rem] flex-wrap sm:p-0 px-6">
        <InputField<UserInput, 'userId'>
          className="w-full sm:w-80"
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
        <Button
          className="w-full sm:w-fit"
          size="xl"
          loading={isFormLoading}
          buttonProps={{ type: 'submit', disabled: isFormLoading }}
        >
          <div className="flex items-center gap-1">
            <div>Get Started</div>
            <FontAwesomeIcon icon={faChevronRight} fixedWidth />
          </div>
        </Button>
      </div>
    </form>
  )
}
