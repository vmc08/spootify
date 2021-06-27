import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITokens } from "types/tokens";
import { saveState } from "utils/localStorage";

export const tokensInitialState: ITokens = {
  access_token: "",
  expires_in: 0,
  refresh_token: "",
  token_type: "",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState: tokensInitialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<ITokens>) => {
      state = payload;
      saveState("tokens", state);
    },
  },
});

export const { setTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
