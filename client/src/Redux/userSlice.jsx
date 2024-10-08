import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    deleteUserSuccess: (state) => {
      (state.loading = false), (state.error = null), (state.currentUser = null);
    },
    deleteUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    logoutUserSuccess: (state) => {
      (state.loading = false), (state.error = null), (state.currentUser = null);
    },
    logoutUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFail,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
  deleteUserFail,
  deleteUserSuccess,
  deleteUserStart,
  logoutUserFail,
  logoutUserSuccess,
  logoutUserStart,
} = userSlice.actions;
// export const AllUserState = useSelector((state) => state.user);
export default userSlice.reducer;
