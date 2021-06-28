import { useEffect } from "react";

import useSpotify from "hooks/useSpotify";
import useSpotifyStore from "store/spotify/useSpotifyStore";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

const Discover = () => {
  const { getNewReleases, getFeaturedPlaylists, getCategories } = useSpotify();
  const { newReleases, featuredPlaylists, categories } = useSpotifyStore();

  useEffect(() => {
    getNewReleases();
    getFeaturedPlaylists();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        response={newReleases}
      />
      <DiscoverBlock
        text="FEATURED PLAYLISTS"
        id="featured"
        response={featuredPlaylists}
      />
      <DiscoverBlock text="BROWSE" id="browse" response={categories} />
    </div>
  );
};

export default Discover;
