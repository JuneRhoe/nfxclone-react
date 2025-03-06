import { ButtonHTMLAttributes } from 'react'
import clsx, { ClassValue } from 'clsx'
import Loader from '../Loader/Loader'
import { IconDefinition as SolidIconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition as RegularIconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconButtonType = 'primary' | 'secondary'

interface Props {
  icon: RegularIconDefinition | SolidIconDefinition
  type?: IconButtonType
  className?: ClassValue[] | string
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  loading?: boolean
}

export default function IconButton({
  icon,
  type = 'primary',
  className,
  buttonProps,
  loading,
}: Props) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        `cursor-pointer text-sm md:text-xl border-2 rounded-4xl p-1 px-1.5 transition-all
        duration-300`,
        {
          'border-gray-400 text-gray-400': type === 'primary',
          'hover:border-gray-50 hover:text-white': type === 'primary',
        },
      )}
    >
      {loading ? (
        <Loader type="primary" display="inline" className="pt-0.5" />
      ) : (
        <FontAwesomeIcon icon={icon} fixedWidth />
      )}
    </button>
  )
}
