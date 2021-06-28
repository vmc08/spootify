import { useDispatch, useSelector } from "react-redux";

import { IReduxState } from "store/reducers";
import { setResponse, TPayload } from "./spotifySlice";

const useTokens = () => {
  const dispatch = useDispatch();
  const newReleases = useSelector(
    (state: IReduxState) => state.spotify.newReleases
  );
  const featuredPlaylists = useSelector(
    (state: IReduxState) => state.spotify.featuredPlaylists
  );
  const categories = useSelector(
    (state: IReduxState) => state.spotify.categories
  );

  const setResponseAction = (args: TPayload) => dispatch(setResponse(args));

  return {
    newReleases,
    featuredPlaylists,
    categories,
    setResponseAction,
  };
};

export default useTokens;
