import { PATH_BROWSE_ABOUT, PATH_BROWSE } from '@/route/routes'
import NavTapRegularButton from './NavTapRegularButton'

export default function NavTapRegular() {
  return (
    <>
      <NavTapRegularButton to={PATH_BROWSE}>Home</NavTapRegularButton>
      {/* 
      <NavTapButton to={PATH_BROWSE_MYLIST} >
        My List
      </NavTapButton> 
      */}
      <NavTapRegularButton to={PATH_BROWSE_ABOUT}>About</NavTapRegularButton>
    </>
  )
}
