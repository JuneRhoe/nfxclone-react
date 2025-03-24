import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { PATH_BROWSE_ABOUT, PATH_BROWSE } from '@/route/routes'
import NavTapMobileButton from './NavTapMobileButton'
import { usePopupMenu } from '@/submodule/components/PopupMenu/hooks'
import PopupMenu from '@/submodule/components/PopupMenu/PopupMenu'

export default function NavTapMobile() {
  const { parentRef, styleRect, bridgeGap, isOpen, setIsOpen } =
    usePopupMenu<HTMLDivElement>(
      { axisX: 'left', axisY: 'bottom' },
      { axisX: 'left', axisY: 'top' },
      0.75,
    )

  return (
    <>
      <div
        ref={parentRef}
        className="relative z-31 h-full"
        onPointerEnter={(e) => {
          if (e.pointerType === 'touch') {
            return
          }
          setIsOpen(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'touch') {
            return
          }
          setIsOpen(false)
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <div>Browse</div>
          <FontAwesomeIcon
            icon={faCaretUp}
            className="transition-all duration-200"
            rotation={isOpen ? undefined : 180}
            fixedWidth
          />
        </div>
      </div>

      <PopupMenu
        isOpen={isOpen}
        parentRef={parentRef}
        styleRect={styleRect}
        bridgeGap={bridgeGap}
        setIsOpen={setIsOpen}
        shouldCloseOnPointerLeave
      >
        <div className="mt-4">
          <div
            className="bg-black opacity-90 border-1 border-gray-800 rounded-sm min-w-[9rem]
              animate-fade-in"
            onClick={() => setIsOpen(false)}
          >
            <NavTapMobileButton to={PATH_BROWSE}>Home</NavTapMobileButton>
            {/* 
            <NavTapButton to={PATH_BROWSE_MYLIST} >
              My List
            </NavTapButton> 
            */}
            <NavTapMobileButton to={PATH_BROWSE_ABOUT}>
              About
            </NavTapMobileButton>
          </div>
        </div>
      </PopupMenu>
    </>
  )
}
