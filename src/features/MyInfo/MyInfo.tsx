import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import LinkText from '@/submodule/components/LinkText/LinkText'

export default function MyInfo() {
  return (
    <>
      <div className="flex items-center gap-1">
        <div>
          <span className="text-gray-500">Built by</span> Jung Hyun Rhoe
        </div>
        <Link to="https://www.linkedin.com/in/junghyunrhoe/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} fixedWidth />
        </Link>
      </div>
      <div>
        <div className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="pt-0.5" icon={faGithub} fixedWidth />
            <LinkText
              to="https://github.com/JuneRhoe/nfxclone-react"
              target="_blank"
            >
              https://github.com/JuneRhoe/nfxclone-react
            </LinkText>
          </div>

          <div className="flex items-center gap-2">
            <FontAwesomeIcon className="pt-1" icon={faEnvelope} fixedWidth />
            <div>junghyun.rhoe@gmail.com</div>
            {/* <LinkText to="" target="_blank"></LinkText> */}
          </div>
        </div>
      </div>
    </>
  )
}
