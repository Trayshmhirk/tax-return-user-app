import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import documentReducer from "./features/documentSlice";

const appReducers = {
   documents: documentReducer,
};

export const store = configureStore({
   reducer: appReducers,
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
   ThunkReturnType,
   RootState,
   unknown,
   Action
>;
