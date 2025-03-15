import { useAppSelector } from '@/features/store/hooks'
import { selectModalInfoArray } from '@/submodule/components/Modal/modalSlice'
import ModalWrapper, {
  ModalWrapperProps,
} from '@/submodule/components/Modal/ModalWrapper'

export type ModalProps = Omit<ModalWrapperProps, 'modalInfoArray'>

export default function Modal(props: ModalProps) {
  const modalInfoArray = useAppSelector(selectModalInfoArray)

  return <ModalWrapper modalInfoArray={modalInfoArray} {...props} />
}
