import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { rootReducer, preloadedState } from "./reducers";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
