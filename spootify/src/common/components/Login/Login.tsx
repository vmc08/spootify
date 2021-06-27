import { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

import config from "config";
import "./_login.scss";

export interface ITokenResult {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { code } = queryString.parse(window.location.search);

  const spotifyLogin = () => {
    const urlParams = queryString
      .stringify({
        response_type: "code",
        client_id: config.clientId,
        redirect_uri: config.redirectUrl,
        scopes: config.scopes.join(","),
      })
      .toString();
    window.location.href = `https://accounts.spotify.com/authorize?${urlParams}`;
  };

  const retrieveTokens = async () => {
    try {
      setLoading(true);
      const body = queryString.stringify({
        grant_type: "authorization_code",
        redirect_uri: config.redirectUrl,
        code,
      });
      const result = await axios.post<ITokenResult>(config.api.authUrl, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${btoa(
            `${config.clientId}:${config.clientSecret}`
          )}`,
        },
      });
      console.log(result.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && code) {
      retrieveTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div className="login">
      <button
        className="login__button"
        {...(!loading && {
          onClick: spotifyLogin,
        })}
      >
        {loading ? "Logging in..." : "Log in with Spotify"}
      </button>
    </div>
  );
};

export default Login;
