import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = 'darkMode' | 'lightMode'

export interface ThemeSliceState {
  mode: ThemeMode
}

const initialState: ThemeSliceState = {
  mode: 'darkMode'
}

export const themeSlice = createSlice({
  name: "themeState",
  
  initialState,
  
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
    },
  },

  selectors: {
    selectThemeMode: themeState => themeState.mode,
  },
})

export const { setThemeMode } = themeSlice.actions

export const { selectThemeMode } = themeSlice.selectors