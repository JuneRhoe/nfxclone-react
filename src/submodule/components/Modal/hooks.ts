import { useEffect, useState } from 'react'
import { nanoid, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { closeAllModal, closeModal, openModal } from './modalSlice'
import './ModalBootstrap.css'

export interface ModalInfo {
  modalId?: string
  disableBodyScrollLock?: boolean
}

export interface ModalInstanceInfo extends ModalInfo {
  openModal: () => void
  closeModal: () => void
  closeAllModal: (exceptIds?: string[]) => void
}

export interface ModalCreationInfo {
  modalInstanceInfo: ModalInstanceInfo
  isVisible: boolean
}

export function useModalWrapper<T>(
  dispatch: ThunkDispatch<T, undefined, UnknownAction>,
  modalInfoArray: ModalInfo[],
  modalInfo?: ModalInfo,
): ModalCreationInfo {
  const modalId = modalInfo?.modalId || nanoid()
  const [modalInstanceInfo] = useState<ModalInstanceInfo>({
    modalId,
    openModal: () => dispatch(openModal({ ...modalInfo, modalId })),
    closeModal: () => dispatch(closeModal(modalId)),
    closeAllModal: (exceptIds) => dispatch(closeAllModal(exceptIds)),
  })

  useEffect(() => {
    return () => {
      modalInstanceInfo.closeModal()
    }
  }, [modalInstanceInfo])

  const isVisible = modalInfoArray.some(
    (modalInfo) => modalInstanceInfo.modalId === modalInfo.modalId,
  )

  return { modalInstanceInfo, isVisible }
}

export function useModalBootstrap(modalInfoArray: ModalInfo[]) {
  useEffect(() => {
    if (modalInfoArray.at(0)?.disableBodyScrollLock) {
      return
    }

    if (modalInfoArray.length > 0) {
      const widthIncludeScroll = document.body.clientWidth
      document.body.classList.add('body-scroll-lock')
      const vscrollWidth = document.body.clientWidth - widthIncludeScroll
      document.body.style.setProperty('--vscroll-width', `${vscrollWidth}px`)
    } else {
      document.body.classList.remove('body-scroll-lock')
      document.body.style.removeProperty('--vscroll-width')
    }
  }, [modalInfoArray])
}
