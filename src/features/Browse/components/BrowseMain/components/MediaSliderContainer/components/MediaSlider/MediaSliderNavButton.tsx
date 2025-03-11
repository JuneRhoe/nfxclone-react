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

interface Props {
  navButtonClass: string
  direction: NavDirection
  pageInfo: PageInfo
  setNavInfo: (navInfo: NavInfo) => void
  setDiableTransition: (disabled: boolean) => void
}

export default function MediaSliderNavButton({
  navButtonClass,
  direction,
  pageInfo,
  setNavInfo,
  setDiableTransition,
}: Props) {
  const screenSize = useScreenSize()

  return (
    <SliderNavButton
      className={`${navButtonClass} ${direction === 'Prev' ? 'left-0' : 'right-0'}`}
      onClick={() => {
        handleNavButtonClick(
          direction,
          pageInfo,
          setNavInfo,
          setDiableTransition,
        )
      }}
    >
      {(isHover) => (
        <FontAwesomeIcon
          className="opacity-0 transition-opacity duration-300 text-white"
          icon={direction === 'Prev' ? faChevronLeft : faChevronRight}
          style={{ opacity: isHover || screenSize === 'xs' ? '100' : '0' }}
          fixedWidth
        />
      )}
    </SliderNavButton>
  )
}
