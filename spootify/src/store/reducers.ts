// tokens
import { ITokens } from "types/tokens";
import tokensReducer, { tokensInitialState } from "store/tokens/tokensSlice";

// account
import { IAccount } from "types/account";
import accountReducer, {
  accountInitialState,
} from "store/account/accountSlice";

import { loadState } from "utils/localStorage";

export interface IReduxState {
  account: { value?: IAccount };
  tokens: { value?: ITokens };
}

export const preloadedState = {
  account: accountInitialState,
  tokens: loadState("tokens") || tokensInitialState,
};

export const rootReducer = {
  account: accountReducer,
  tokens: tokensReducer,
};
