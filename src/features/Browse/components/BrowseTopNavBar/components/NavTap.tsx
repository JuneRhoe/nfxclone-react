import { To } from 'react-router'
import { browseAboutPath, browseMyListPath, browsePath } from '@/routes'
import NavTapButton from './NavTapButton'

interface Props {
  onClickNavButton?: (to: To) => void
}

export default function NavTap({ onClickNavButton }: Props) {
  return (
    <div className="flex h-full items-center gap-4">
      <NavTapButton to={browsePath} onClick={onClickNavButton}>
        Home
      </NavTapButton>
      <NavTapButton to={browseMyListPath} onClick={onClickNavButton}>
        My List
      </NavTapButton>
      <NavTapButton to={browseAboutPath} onClick={onClickNavButton}>
        About
      </NavTapButton>
    </div>
  )
}
