import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormState,
  LiteralUnion,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

type InputControlType = 'primary' | 'secondary'
type InputControlSize = 'md' | 'lg'

interface Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> {
  formRegisterReturn: UseFormRegisterReturn
  formState: FormState<TFieldValues>
  getValues: (
    name: TFieldName | string,
  ) => FieldPathValue<TFieldValues, TFieldName>
  label?: string
  type?: InputControlType
  size?: InputControlSize
  mapErrorMsg?: Map<LiteralUnion<keyof RegisterOptions, string>, string>
  autoComplete?: boolean
  className?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

function getBorderColor(isFocused: boolean, type: InputControlType): string {
  let borderColor = 'transparent'

  if (isFocused) {
    switch (type) {
      case 'primary':
        borderColor = 'white'
        break
      case 'secondary':
        borderColor = 'var(--color-g-gray-700)'
        break
    }
  }

  return borderColor
}

export default function InputField<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  formRegisterReturn,
  formState,
  getValues,
  label = '',
  type = 'primary',
  size = 'md',
  mapErrorMsg,
  autoComplete,
  className,
  inputProps,
}: Props<TFieldValues, TFieldName>) {
  const [isFocused, setFocused] = useState(false)
  const inputValue: string = getValues(formRegisterReturn.name) || ''
  const fieldError = formState.errors[formRegisterReturn.name]
  const errorMsg = mapErrorMsg?.get(fieldError?.type as string)
  const hasError = !!fieldError

  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      <div
        className="rounded-md border-white border-2 m-[-4px]"
        style={{ borderColor: getBorderColor(isFocused, type) }}
      >
        <div
          className={clsx(
            'relative rounded-md border-1 text-base font-normal m-[2px]',
            {
              'bg-[#191919b3]': type === 'primary',
              'bg-transparent': type === 'secondary',
              'h-13 px-4': size === 'lg',
              'h-8 px-1': size === 'md',
            },
          )}
          style={{
            borderColor: hasError ? '#eb3942' : 'var(--color-gray-500)',
          }}
        >
          {size === 'lg' && label && (
            <div
              className="pointer-events-none absolute ease-[cubic-bezier(0.4, 0, 0.68, 0.06)]
                text-gray-400 transition-all duration-200"
              style={
                isFocused || inputValue.length > 0
                  ? { top: '0.1875rem', fontSize: 'var(--text-xs)' }
                  : { top: '0.625rem', fontSize: 'var(--text-lg)' }
              }
            >
              {label}
            </div>
          )}
          <input
            {...inputProps}
            {...formRegisterReturn}
            className={clsx(
              inputProps?.className,
              'h-full w-full rounded-md outline-0',
              {
                'text-white': type === 'primary',
                'text-lg': size === 'lg',
                'pt-4': size === 'lg' && label,
                'pt-0': size === 'lg' && !label,
                'text-base pt-0 px-3': size === 'md',
              },
            )}
            autoComplete={autoComplete ? 'on' : 'new-password'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
      {formState.errors[formRegisterReturn.name] && errorMsg && (
        <div className="flex gap-1 items-center text-[#eb3942] font-bold">
          <div className="text-sm">
            <FontAwesomeIcon icon={faCircleXmark} fixedWidth />
          </div>
          <div className="text-xs">{errorMsg}</div>
        </div>
      )}
    </div>
  )
}
