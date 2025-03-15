import ReactModal from 'react-modal'
import { selectModalInfoArray } from '../submodule/components/Modal/modalSlice'
import { useAppSelector } from '../features/store/hooks'
import { useModalBootstrap } from '@/submodule/components/Modal/hooks'

interface Props {
  rootContainer: HTMLElement
  children: React.ReactElement
}

export default function ModalBootstrap({ rootContainer, children }: Props) {
  ReactModal.setAppElement(rootContainer)

  const modalInfoArray = useAppSelector(selectModalInfoArray)
  useModalBootstrap(modalInfoArray)

  return <>{children}</>
}
