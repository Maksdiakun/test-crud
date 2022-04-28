import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { EnhancedStore } from "@reduxjs/toolkit/src/configureStore";
import { ThunkMiddlewareFor } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { rootReducer } from "./reducers";

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type storeType = EnhancedStore<
  RootState,
  AnyAction,
  [ThunkMiddlewareFor<RootState>]
>;
