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
        `absolute z-10 flex justify-center items-center w-[1.625rem] sm:w-[2.625rem]
        min-h-full bg-[#171717] opacity-70 hover:opacity-85 top-0 transition-opacity
        duration-300`,
        {
          'left-[-0.25rem]': direction === 'Prev',
          'right-0': direction === 'Next',
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
