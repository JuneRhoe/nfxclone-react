import { ButtonHTMLAttributes } from 'react'
import clsx, { ClassValue } from 'clsx'
import Loader from '../Loader/Loader'
import { IconDefinition as SolidIconDefinition } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition as RegularIconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type IconButtonType = 'primay' | 'secondary' | 'simple'

interface Props {
  icon: RegularIconDefinition | SolidIconDefinition
  type?: IconButtonType
  className?: ClassValue[] | string
  fullHeight?: boolean
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  loading?: boolean
  hasBorder?: boolean
}

export default function IconButton({
  icon,
  type = 'primay',
  className,
  fullHeight,
  buttonProps,
  loading,
}: Props) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        className,
        `flex justify-center items-center cursor-pointer select-none outline-0
        transition-all duration-300 rounded-4xl border-2 p-1 px-1.5`,
        {
          'text-sm md:text-xl px-[0.3125rem] py-[0.4375rem]': !fullHeight,
          'max-h-12': fullHeight,
          'text-gray-400 border-gray-400': type === 'primay' || loading,
          'hover:border-gray-50 hover:text-white': type === 'primay',
          'bg-gray-300 text-black border-gray-300': type === 'secondary',
          'hover:bg-gray-50': type === 'secondary',
          'text-gray-400 border-2 border-gray-900 bg-gray-900':
            type === 'simple',
          'hover:text-white': type === 'simple',
        },
      )}
    >
      {loading ? (
        <Loader
          type="primary"
          display="inline"
          className="h-full"
          iconClassName="w-[1rem] h-[1rem]"
        />
      ) : (
        <FontAwesomeIcon
          icon={icon}
          style={
            fullHeight
              ? { height: '100%', maxHeight: '28px', aspectRatio: '1' }
              : undefined
          }
          fixedWidth
        />
      )}
    </button>
  )
}
