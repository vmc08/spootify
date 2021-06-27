import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import config from "config";
import { ITokens } from "types/tokens";
import useTokens from "store/tokens/useTokens";
import "./_login.scss";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { setTokensAction } = useTokens();
  const { code } = queryString.parse(window.location.search);

  const spotifyLogin = () => {
    const urlParams = queryString
      .stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
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
        redirect_uri: REDIRECT_URI,
        code,
      });
      const result = await axios.post<ITokens>(config.api.authUrl, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${btoa(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          )}`,
        },
      });
      setTokensAction(result.data);
      history.push("/");
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
        {loading ? "Loading..." : "Log in with Spotify"}
      </button>
    </div>
  );
};

export default Login;
