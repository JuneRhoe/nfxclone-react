import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldValues,
  LiteralUnion,
  RegisterOptions,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../IconButton/IconButton'

type InputControlType = 'primary' | 'secondary'
type InputControlSize = 'md' | 'lg'

interface Props<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> extends Partial<UseFormReturn<TFieldValues>> {
  formRegisterReturn: UseFormRegisterReturn<TFieldName>
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
  label = '',
  type = 'primary',
  size = 'md',
  mapErrorMsg,
  autoComplete,
  className,
  inputProps,
  formState,
  getValues,
  setFocus,
}: Props<TFieldValues, TFieldName>) {
  const [isFocused, setFocused] = useState(false)
  const [inputType, setInputType] = useState(inputProps?.type || 'text')

  const inputValue = getValues?.<TFieldName>(formRegisterReturn.name) || ''

  const fieldError = formState?.errors[formRegisterReturn.name]
  const errorMsg = mapErrorMsg?.get(fieldError?.type as string)
  const hasError = !!fieldError

  const showLabel = size === 'lg' && label
  const showPasswordDisplayIcon =
    (isFocused || inputValue.length > 0) &&
    size === 'lg' &&
    inputProps?.type === 'password'

  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      <div
        className="m-[-4px] rounded-md border-2 border-white"
        style={{ borderColor: getBorderColor(isFocused, type) }}
      >
        <div
          className={clsx(
            'relative m-[2px] rounded-md border-1 text-base font-normal',
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
          {showLabel && (
            <div
              className="ease-[cubic-bezier(0.4, 0, 0.68, 0.06)] pointer-events-none absolute
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
            type={inputType}
            className={clsx(
              inputProps?.className,
              'h-full w-full rounded-md outline-0',
              {
                'text-white': type === 'primary',
                'text-lg': size === 'lg',
                'pt-4': size === 'lg' && label,
                'pt-0': size === 'lg' && !label,
                'px-3 pt-0 text-base': size === 'md',
              },
            )}
            autoComplete={autoComplete ? 'on' : 'new-password'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {showPasswordDisplayIcon && (
            <div className="absolute top-0 right-2 flex h-full items-center">
              <IconButton
                className={'border-transparent bg-transparent'}
                type="simple"
                icon={inputType === 'password' ? faEye : faEyeSlash}
                buttonProps={{
                  onFocus: () => setFocus?.(formRegisterReturn.name),
                  onClick: (e) => {
                    if (e.target instanceof HTMLButtonElement) {
                      return
                    }
                    e.stopPropagation()
                    e.preventDefault()
                    setInputType(inputType === 'password' ? 'text' : 'password')
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
      {formState?.errors[formRegisterReturn.name] && errorMsg && (
        <div className="flex items-center gap-1 font-bold text-[#eb3942]">
          <div className="text-sm">
            <FontAwesomeIcon icon={faCircleXmark} fixedWidth />
          </div>
          <div className="text-xs">{errorMsg}</div>
        </div>
      )}
    </div>
  )
}
