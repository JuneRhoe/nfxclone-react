import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Button from '@/submodule/components/Button/Button'
import { useForm } from 'react-hook-form'
import { UserInput } from '@/mock/mock-data-definitions'
import { MIN_LENGTH_USER_ID } from '@/mock/mock-data'
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
      className="relative flex h-full w-full flex-col items-center justify-center gap-5
        text-white"
    >
      <div className="absolute z-0 h-full w-full bg-black opacity-50" />
      <div
        className="z-1 flex max-w-90 flex-col justify-center text-center text-4xl leading-12
          font-extrabold text-white"
      >
        <div>Unlimited movies, TV shows, and more</div>
        <div className="pt-1 text-base font-normal">
          Starts at $0.00. Cancel anytime.
        </div>
      </div>
      <div className="z-1 pt-1 text-base font-normal text-white">
        Ready to watch? Enter your user ID to create your membership.
      </div>
      <div className="z-1 flex h-[6rem] flex-wrap items-start justify-center gap-2 px-6 sm:p-0">
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
