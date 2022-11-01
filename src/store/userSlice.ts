import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LOCAL_STORAGE } from '@/constants'
import { isPlainObject } from 'lodash'

export interface UserInfoProps {
}

export interface UserState {
  isLogin: boolean
  isLockScreen: boolean
  userInfo: UserInfoProps
}

let localUser
try {
  const r = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER) as string)
  if (isPlainObject(r)) {
    localUser = r
  }
} catch {}

const initialState: UserState = {
  isLogin: !!localUser,
  isLockScreen: false,
  userInfo: localUser || {
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER_INFO: (state, action: PayloadAction<UserInfoProps>) => {
      const userInfo = action.payload
      state.userInfo = userInfo
    }
  }
})

export const { SET_USER_INFO } = userSlice.actions

export default userSlice.reducer
