import { browseAboutPath, browsePath } from '@/routes'
import NavTapRegularButton from './NavTapRegularButton'

export default function NavTapRegular() {
  return (
    <>
      <NavTapRegularButton to={browsePath}>Home</NavTapRegularButton>
      {/* 
      <NavTapButton to={browseMyListPath} >
        My List
      </NavTapButton> 
      */}
      <NavTapRegularButton to={browseAboutPath}>About</NavTapRegularButton>
    </>
  )
}
