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
import { useMediaQueryXS } from '@/submodule/hooks'
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
  const isScreenXS = useMediaQueryXS()

  return (
    <SliderNavButton
      className={clsx(
        `absolute top-0 z-10 flex min-h-full w-[1.625rem] items-center justify-center
        bg-[#171717] opacity-70 transition-opacity duration-300 hover:opacity-85
        sm:w-[2.625rem]`,
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
            className="text-3xl text-white opacity-0 transition-opacity duration-300 sm:text-4xl"
            icon={direction === 'Prev' ? faChevronLeft : faChevronRight}
            style={{ opacity: isHover || isScreenXS ? '100' : '0' }}
            fixedWidth
          />
        )
      }
    </SliderNavButton>
  )
}
