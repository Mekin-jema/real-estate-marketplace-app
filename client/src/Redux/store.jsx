import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (
    getDefaultMiddleware // eslint-disable-line no-unused-vars
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
