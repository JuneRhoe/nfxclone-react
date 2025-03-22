import clsx, { ClassValue } from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import iconUser from '@/assets/images/browse/icon_user_0.png'
import Image from '@/submodule/components/Image/Image'

interface Props {
  ref: React.Ref<HTMLButtonElement>
  isOpen: boolean
  className?: ClassValue[] | string
  onPointerEnter?: (e: React.PointerEvent<HTMLElement>) => void
  onPointerLeave?: (e: React.PointerEvent<HTMLElement>) => void
  onClick: () => void
}

export default function UserMenuButton({
  ref,
  isOpen,
  className,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: Props) {
  return (
    <button
      ref={ref}
      className={clsx(className, 'flex h-[2rem] cursor-pointer')}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <div className="flex items-center h-full gap-1 transition-all duration-300">
        <Image
          className="h-full"
          imgClassName="h-full rounded-sm"
          src={iconUser}
        />
        <FontAwesomeIcon
          icon={faCaretUp}
          className="transition-all duration-200"
          rotation={isOpen ? undefined : 180}
          fixedWidth
        />
      </div>
    </button>
  )
}
