import { useEffect, useRef } from 'react'

interface Props {
  isOpen: boolean
  parentRef: React.RefObject<HTMLElement | null>
  styleRect: React.CSSProperties
  bridgeGap: number
  children: React.ReactNode
  shouldCloseOnPointerLeave?: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function PopupMenu({
  isOpen,
  parentRef,
  styleRect,
  bridgeGap,
  children,
  shouldCloseOnPointerLeave,
  setIsOpen,
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (e: PointerEvent | MouseEvent) => {
      if (!isOpen) {
        return
      }

      if (
        e.target !== divRef.current &&
        (divRef.current?.contains(e.target as Node) ||
          parentRef.current?.contains(e.target as Node))
      ) {
        return
      }

      setIsOpen(false)
    }

    window.addEventListener('click', handleClick)

    return () => window.removeEventListener('click', handleClick)
  }, [isOpen, parentRef, setIsOpen])

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e}
          ref={divRef}
          className="absolute z-30"
          style={styleRect}
          onPointerEnter={() => {
            if (!shouldCloseOnPointerLeave) {
              return
            }

            setIsOpen(true)
          }}
          onPointerLeave={(e) => {
            if (!shouldCloseOnPointerLeave) {
              return
            }

            if (
              e.target !== divRef.current &&
              divRef.current?.contains(e.target as Node)
            ) {
              return
            }

            setIsOpen(false)
          }}
        >
          <div style={{ margin: `${bridgeGap}rem` }}>{children}</div>
        </div>
      )}
    </>
  )
}
