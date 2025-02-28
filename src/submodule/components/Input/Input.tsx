import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  FormState,
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
  errorMsg?: string
  autoComplete?: boolean
  className?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function Input<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>({
  formRegisterReturn,
  formState,
  getValues,
  label = '',
  type = 'primary',
  size = 'md',
  errorMsg = '',
  autoComplete,
  className,
  inputProps,
}: Props<TFieldValues, TFieldName>) {
  const [isFocus, setFocus] = useState(false)
  const inputValue: string = getValues(formRegisterReturn.name) || ''
  const hasError = !!formState.errors[formRegisterReturn.name]

  return (
    <div className="flex flex-col gap-1">
      <div
        className="rounded-md border-white border-2 m-[-4px]"
        style={{ borderColor: isFocus ? 'white' : 'transparent' }}
      >
        <div
          className={clsx(
            className,
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
                isFocus || inputValue.length > 0
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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
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
