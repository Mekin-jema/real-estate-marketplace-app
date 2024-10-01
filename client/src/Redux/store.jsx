import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
const rootReducer = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root ",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (middleware) => middleware({ serializableCheck: false }),
});

export default store;
export const persistor = persistStore(store);
