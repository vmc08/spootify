import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TResponse } from "types/spotify";

export type TPayload = {
  data?: TResponse;
  key: keyof typeof spotifyInitialState;
};

export const spotifyInitialState: {
  newReleases?: TResponse;
  featuredPlaylists?: TResponse;
  categories?: TResponse;
} = {};

const spotifySlice = createSlice({
  name: "spotify",
  initialState: spotifyInitialState,
  reducers: {
    setResponse: (state, { payload }: PayloadAction<TPayload>) => {
      const stateByKey = state[payload.key];
      if (stateByKey) {
        stateByKey.next = payload.data?.next;
        stateByKey.previous = payload.data?.previous;
        // append new results
        stateByKey.data = [
          ...(state[payload.key]?.data || []),
          ...(payload.data?.data || []),
        ];
      } else {
        state[payload.key] = payload.data;
      }
    },
  },
});

export const { setResponse } = spotifySlice.actions;
export default spotifySlice.reducer;
