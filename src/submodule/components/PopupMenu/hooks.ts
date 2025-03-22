import { useRef, useState } from "react"
import { getPopupMenuStyleRect, PopupOrigin } from "./utils"

export function usePopupMenu<TParent extends HTMLElement>(
  parentOrigin: PopupOrigin,
  menuOrigin: PopupOrigin,
  bridgeGap: number = 0.5
) {
  const parentRef = useRef<TParent | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const parentRect = parentRef.current?.getBoundingClientRect()

  const styleRect = getPopupMenuStyleRect(parentOrigin, menuOrigin, parentRect, bridgeGap)

  return {
    parentRef,
    styleRect,
    bridgeGap,
    isOpen,
    setIsOpen
  }
}