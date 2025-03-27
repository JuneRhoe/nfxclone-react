import { useAppDispatch, useAppSelector } from '@/features/store/hooks'
import {
  ModalState,
  selectModalInfoArray,
} from '@/submodule/components/Modal/modalSlice'
import {
  ModalCreationInfo,
  ModalInfo,
  useModalWrapper,
} from '@/submodule/components/Modal/hooks'

export function useModal(modalInfo?: ModalInfo): ModalCreationInfo {
  const dispatch = useAppDispatch()
  const modalInfoArray = useAppSelector(selectModalInfoArray)

  return useModalWrapper<{ modalState: ModalState }>(
    dispatch,
    modalInfoArray,
    modalInfo,
  )
}
