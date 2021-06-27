import axios from "axios";

import config from "config";
import useTokens from "store/tokens/useTokens";

const useAxios = () => {
  const { tokensState } = useTokens();
  return axios.create({
    baseURL: config.api.baseUrl,
    headers: {
      Authorization: `${tokensState?.token_type} ${tokensState?.access_token}`,
    },
  });
};

export default useAxios;
