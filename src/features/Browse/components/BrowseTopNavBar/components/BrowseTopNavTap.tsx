import { To } from 'react-router'
import { browseAboutPath, browseMyListPath, browsePath } from '@/routes'
import BrowseTopNavTapButton from './BrowseTopNavTapButton'

interface Props {
  onClickNavButton: (to: To) => void
}

export default function BrowseTopNavTap({ onClickNavButton }: Props) {
  return (
    <div className="flex h-full items-center gap-4">
      <BrowseTopNavTapButton to={browsePath} onClick={onClickNavButton}>
        Home
      </BrowseTopNavTapButton>
      <BrowseTopNavTapButton to={browseMyListPath} onClick={onClickNavButton}>
        My List
      </BrowseTopNavTapButton>
      <BrowseTopNavTapButton to={browseAboutPath} onClick={onClickNavButton}>
        About
      </BrowseTopNavTapButton>
    </div>
  )
}
