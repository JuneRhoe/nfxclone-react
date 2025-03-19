import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import clsx from 'clsx'
import { useAppSelector } from '../store/hooks'
import { selectThemeMode } from '../store/themeSlice'

export default function Footer() {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div
      className={clsx('flex h-[7.5rem] w-full items-center justify-center', {
        'text-[#737373]': themeMode === 'lightMode',
        'text-white': themeMode === 'darkMode',
      })}
    >
      <div className="flex items-center gap-2 text-base sm:text-2xl">
        <div>
          <span className="text-gray-500">Built by</span> Jung Hyun Rhoe
        </div>

        <Link to="https://www.linkedin.com/in/junghyunrhoe/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} fixedWidth />
        </Link>
      </div>
    </div>
  )
}
