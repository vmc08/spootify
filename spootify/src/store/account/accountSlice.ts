import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAccount } from "types/account";

export const accountInitialState: IAccount = {
  display_name: "",
  email: "",
  external_urls: {
    spotify: "",
  },
  href: "",
  id: "",
  images: [],
  product: "",
  type: "",
  uri: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitialState,
  reducers: {
    setAccount: (state, { payload }: PayloadAction<IAccount>) => {
      state = payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
