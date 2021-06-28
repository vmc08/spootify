import { useEffect, useState } from "react";

import useSpotify from "hooks/useSpotify";
import useSpotifyStore from "store/spotify/useSpotifyStore";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

const Discover = () => {
  const [newReleasePage, setNewReleasesPage] = useState(0);
  const [featuredPlaylistsPage, setFeaturedPlaylistsPage] = useState(0);
  const [categoriesPage, setCategoriesPage] = useState(0);

  const { getNewReleases, getFeaturedPlaylists, getCategories } = useSpotify();
  const { newReleases, featuredPlaylists, categories } = useSpotifyStore();

  useEffect(() => {
    getNewReleases({ page: newReleasePage });
    getFeaturedPlaylists({ page: featuredPlaylistsPage });
    getCategories({ page: categoriesPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        response={newReleases}
        fetchMore={getNewReleases}
        pageNum={newReleasePage}
        setPage={setNewReleasesPage}
      />
      <DiscoverBlock
        text="FEATURED PLAYLISTS"
        id="featured"
        response={featuredPlaylists}
        fetchMore={getFeaturedPlaylists}
        pageNum={featuredPlaylistsPage}
        setPage={setFeaturedPlaylistsPage}
      />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        response={categories}
        fetchMore={getCategories}
        pageNum={categoriesPage}
        setPage={setCategoriesPage}
      />
    </div>
  );
};

export default Discover;
