import { IAccount } from "types/account";
import accountReducer, {
  accountInitialState,
} from "store/account/accountSlice";

export interface IReduxState {
  account: IAccount;
}

export const preloadedState = {
  account: accountInitialState,
};

export const rootReducer = {
  account: accountReducer,
};
