export type OriginAxisX = 'left' | 'right'
export type OriginAxisY = 'top' | 'bottom'

export interface PopupOrigin {
  axisX: OriginAxisX
  axisY: OriginAxisY
}

export function getPopupMenuStyleRect(
  parentOrigin: PopupOrigin,
  menuOrigin: PopupOrigin,
  parentRect: DOMRect | undefined,
  bridgeGap: number
): React.CSSProperties {
  const offsetWidth = window.document.body.offsetWidth

  let styleRect: React.CSSProperties = {}

  if (!parentRect) {
    return styleRect
  }
  
  if (parentOrigin.axisX === 'left' && parentOrigin.axisY === 'top') {
    //
  } else if (parentOrigin.axisX === 'right' && parentOrigin.axisY === 'top') {
    //
  } else if (parentOrigin.axisX === 'left' && parentOrigin.axisY === 'bottom') {
    if (menuOrigin.axisX === 'left' && menuOrigin.axisY === 'top') {
      styleRect = {
        left: `calc(${parentRect.left}px - ${bridgeGap}rem)`,
        top: `calc(${parentRect.bottom}px - ${bridgeGap}rem)`,
      }
    } else if (menuOrigin.axisX === 'right' && menuOrigin.axisY === 'top') {
      //
    } else if (menuOrigin.axisX === 'left' && menuOrigin.axisY === 'bottom') {
      //
    } else if (menuOrigin.axisX === 'right' && menuOrigin.axisY === 'bottom') {
      //
    }
  } else if (parentOrigin.axisX === 'right' && parentOrigin.axisY === 'bottom') {
    if (menuOrigin.axisX === 'left' && menuOrigin.axisY === 'top') {
      //
    } else if (menuOrigin.axisX === 'right' && menuOrigin.axisY === 'top') {
      styleRect = {
        right: `calc(${offsetWidth - parentRect.right}px - ${bridgeGap}rem)`,
        top: `calc(${parentRect.bottom}px - ${bridgeGap}rem)`,
      }
    } else if (menuOrigin.axisX === 'left' && menuOrigin.axisY === 'bottom') {
      //
    } else if (menuOrigin.axisX === 'right' && menuOrigin.axisY === 'bottom') {
      //
    }
  }

  return styleRect
}