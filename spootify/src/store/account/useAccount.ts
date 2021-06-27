import { useDispatch, useSelector } from "react-redux";

import { IReduxState } from "store/reducers";
import { setAccount } from "./accountSlice";

const useAccount = () => {
  const dispatch = useDispatch();
  const accountState = useSelector((state: IReduxState) => state.account.value);
  const setAccountAction = (data: IReduxState["account"]["value"]) =>
    dispatch(setAccount(data));

  return {
    accountState,
    setAccountAction,
  };
};

export default useAccount;
