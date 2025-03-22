import { useSignOut } from '@/features/Browse/hooks'
import UserMenuButton from './components/UserMenuButton'
import { useUserCookie } from '@/features/hooks'
import { usePopupMenu } from '@/submodule/components/PopupMenu/hooks'
import PopupMenu from '@/submodule/components/PopupMenu/PopupMenu'
import iconUser from '@/assets/images/browse/icon_user_0.png'
import Image from '@/submodule/components/Image/Image'
import Button from '@/submodule/components/Button/Button'

export default function UserMenu() {
  const { signOut } = useSignOut()
  const { storedUserId } = useUserCookie()

  const { parentRef, styleRect, bridgeGap, isOpen, setIsOpen } =
    usePopupMenu<HTMLButtonElement>(
      { axisX: 'right', axisY: 'bottom' },
      { axisX: 'right', axisY: 'top' },
      1,
    )

  return (
    <>
      <UserMenuButton
        ref={parentRef}
        isOpen={isOpen}
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
      />

      <PopupMenu
        isOpen={isOpen}
        parentRef={parentRef}
        styleRect={styleRect}
        bridgeGap={bridgeGap}
        setIsOpen={setIsOpen}
        shouldCloseOnPointerLeave
      >
        <div className="mt-6">
          <div
            className="bg-black opacity-90 border-1 border-gray-800 rounded-sm min-w-[9rem]
              animate-fade-in"
          >
            <div className="flex flex-col py-3 text-xs gap-3">
              <div className="flex items-center gap-2 h-[1rem] px-3">
                <Image src={iconUser} imgClassName="rounded-sm" />
                <div>{storedUserId}</div>
              </div>
              <div className="bg-gray-700 h-[1px]" />
              <div className="flex justify-center">
                <Button
                  type="simple"
                  size="xs"
                  buttonProps={{ onClick: signOut }}
                >
                  <span className="hover:underline">
                    Sign out of Netflix Clone
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopupMenu>
    </>
  )
}
