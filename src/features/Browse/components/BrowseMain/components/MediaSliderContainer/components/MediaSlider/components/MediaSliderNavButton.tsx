import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import SliderNavButton, {
  NavDirection,
} from '@/submodule/components/Slider/components/SliderNavButton'
import {
  handleNavButtonClick,
  NavInfo,
  PageInfo,
} from '@/submodule/components/Slider/hooks'
import { useScreenSize } from '@/submodule/hooks'
import clsx from 'clsx'

interface Props {
  direction: NavDirection
  pageInfo: PageInfo
  disabled?: boolean
  setNavInfo: (navInfo: NavInfo) => void
  setDiableTransition: (disabled: boolean) => void
  onClick?: (direction: NavDirection) => void
}

export default function MediaSliderNavButton({
  direction,
  pageInfo,
  disabled,
  setNavInfo,
  setDiableTransition,
  onClick,
}: Props) {
  const screenSize = useScreenSize()

  return (
    <SliderNavButton
      className={clsx(
        `absolute z-10 flex justify-center items-center w-[var(1.5rem + 2px)]
        sm:w-[var(2.5rem + 2px)] min-h-full bg-[#171717] opacity-70 hover:opacity-85
        top-0 transition-opacity duration-300 `,
        {
          'left-[-1px]': direction === 'Prev',
          'right-[-1px]': direction === 'Next',
          'cursor-pointer': !disabled,
          'cursor-auto': disabled,
        },
      )}
      onClick={() => {
        if (disabled) {
          return
        }

        handleNavButtonClick(
          direction,
          pageInfo,
          setNavInfo,
          setDiableTransition,
        )

        onClick?.(direction)
      }}
    >
      {(isHover) =>
        !disabled && (
          <FontAwesomeIcon
            className="opacity-0 transition-opacity duration-300 text-white text-3xl sm:text-4xl"
            icon={direction === 'Prev' ? faChevronLeft : faChevronRight}
            style={{ opacity: isHover || screenSize === 'xs' ? '100' : '0' }}
            fixedWidth
          />
        )
      }
    </SliderNavButton>
  )
}
