import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAccount } from "types/account";

export const accountInitialState: { value?: IAccount } = {};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    setAccount: (state, { payload }: PayloadAction<IAccount | undefined>) => {
      state.value = payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
