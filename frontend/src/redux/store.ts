import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
  }
});

export default store
