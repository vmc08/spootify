// tokens
import tokensReducer, { tokensInitialState } from "store/tokens/tokensSlice";

// account
import accountReducer, {
  accountInitialState,
} from "store/account/accountSlice";

// spotify
import spotifyReducer, {
  spotifyInitialState,
} from "store/spotify/spotifySlice";

import { loadState } from "utils/localStorage";

export interface IReduxState {
  account: typeof accountInitialState;
  tokens: typeof tokensInitialState;
  spotify: typeof spotifyInitialState;
}

export const preloadedState = {
  account: accountInitialState,
  tokens: loadState("tokens") || tokensInitialState,
  spotify: spotifyInitialState,
};

export const rootReducer = {
  account: accountReducer,
  tokens: tokensReducer,
  spotify: spotifyReducer,
};
