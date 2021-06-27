import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITokens } from "types/tokens";
import { saveState } from "utils/localStorage";

export const tokensInitialState: { value?: ITokens } = {
  value: undefined,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState: tokensInitialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<ITokens | undefined>) => {
      state.value = payload;
      saveState("tokens", state);
    },
  },
});

export const { setTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
