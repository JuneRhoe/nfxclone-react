import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserInfo } from "@/mock/mock-data-definitions"

export interface UserInfoState {
  userInfo: UserInfo | null
}

const initialState: UserInfoState = {
  userInfo: null
}

export const userInfoSlice = createSlice({
  name: "userInfoState",
  
  initialState,
  
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = { ...action.payload }
    },
    removeUserInfo: (state) => {
      state.userInfo = null
    }
  },

  selectors: {
    selectUserInfo: userInfoState => userInfoState.userInfo,
  },
})

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions

export const { selectUserInfo } = userInfoSlice.selectors