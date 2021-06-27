import { useEffect } from "react";

import Routes from "routes";
import CoreLayout from "common/layouts/CoreLayout";
import Login from "common/components/Login";
import useTokens from "store/tokens/useTokens";
import useAccount from "store/account/useAccount";
import useAxios from "hooks/useAxios";
import { IAccount } from "types/account";

const App = () => {
  const axios = useAxios();
  const { accountState, setAccountAction } = useAccount();
  const { tokensState } = useTokens();

  const fetchAccountDetails = async () => {
    try {
      const result = await axios.get<IAccount>("/me");
      setAccountAction(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (tokensState?.access_token && !accountState?.id) {
      fetchAccountDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensState?.access_token]);

  return tokensState?.access_token ? (
    <CoreLayout>
      <Routes />
    </CoreLayout>
  ) : (
    <Login />
  );
};

export default App;
