import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { modalSlice } from "@/submodule/components/Modal/modalSlice";

const rootReducer = combineSlices(themeSlice, modalSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]