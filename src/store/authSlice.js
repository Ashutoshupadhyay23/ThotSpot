import { createSlice } from "@reduxjs/toolkit"

// authSlice (Slice) is good practice for naming convention if we are using  create VITE project using redux/toolkit {same as create react project}

// this store tracks user authentications if user is authenticated or not

const initialState = {
  status: false,
  userData: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  }
})


export const {login, logout} = authSlice.actions; //login and logout are actions of authSlice

export default authSlice.reducer;