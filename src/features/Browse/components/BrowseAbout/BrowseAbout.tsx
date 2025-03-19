import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function BrowseAbout() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start py-4">
      <div className="relative w-full px-3 md:px-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div>
              <span className="text-gray-500">Built by</span> Jung Hyun Rhoe
            </div>
            <Link
              to="https://www.linkedin.com/in/junghyunrhoe/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} fixedWidth />
            </Link>
          </div>
          <div className="pt-7 text-lg md:text-2xl font-extrabold">
            Technologies used to build Netflix Clone
          </div>
          <div>
            <div className="text-base md:text-xl pt-4 pb-1">Frontend</div>
            <div className="flex flex-col text-gray-400">
              <div>React • Typescript</div>
              <div>React Router</div>
              <div>Tanstack (React Query)</div>
              <div>Redux Toolkit</div>
              <div>React Modal</div>
              <div>React Hook Form</div>
              <div>React Responsive</div>
              <div>Tailwind CSS • Fontawesome</div>
              <div>Vite</div>
            </div>
          </div>
          <div>
            <div className="text-base md:text-xl pt-4 pb-1">Backend</div>
            <div className="flex flex-col text-gray-400">
              <div>Mockapi.io</div>
            </div>
          </div>
          <div>
            <div className="text-base md:text-xl pt-4 pb-1">Deployment</div>
            <div className="flex flex-col text-gray-400">
              <div>Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
