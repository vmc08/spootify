import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { rootReducer, preloadedState } from "./reducers";

// api slice should be imported here for organization
import { spotifyApiSlice } from "store/spotify/spotifyApiSlice";

const store = configureStore({
  reducer: {
    ...rootReducer,
    // api slices
    [spotifyApiSlice.reducerPath]: spotifyApiSlice.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApiSlice.middleware),
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export default store;
