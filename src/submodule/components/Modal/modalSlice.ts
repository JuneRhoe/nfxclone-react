import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalInfo } from './hooks'

export interface ModalState {
  modalInfoArray: ModalInfo[]
}

const initialState: ModalState = {
  modalInfoArray: [],
}

export const modalSlice = createSlice({
  name: 'modalState',

  initialState,

  reducers: {
    openModal: (state, action: PayloadAction<ModalInfo>) => {
      state.modalInfoArray = [...state.modalInfoArray, action.payload]
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modalInfoArray = [
        ...state.modalInfoArray.filter(
          ({ modalId }) => action.payload !== modalId,
        ),
      ]
    },
    closeAllModal: (state, action: PayloadAction<string[] | undefined>) => {
      state.modalInfoArray = [
        ...state.modalInfoArray.filter(({ modalId }) =>
          action.payload?.some((exceptId) => exceptId === modalId),
        ),
      ]
    },
  },

  selectors: {
    selectModalInfoArray: (modalState) => modalState.modalInfoArray,
  },
})

export const { openModal, closeModal, closeAllModal } = modalSlice.actions

export const { selectModalInfoArray } = modalSlice.selectors
