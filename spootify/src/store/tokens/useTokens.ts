import { useDispatch, useSelector } from "react-redux";

import { IReduxState } from "store/reducers";
import { setTokens } from "./tokensSlice";

const useTokens = () => {
  const dispatch = useDispatch();
  const tokensState = useSelector((state: IReduxState) => state.tokens.value);
  const setTokensAction = (data: IReduxState["tokens"]["value"]) =>
    dispatch(setTokens(data));

  return {
    tokensState,
    setTokensAction,
  };
};

export default useTokens;
