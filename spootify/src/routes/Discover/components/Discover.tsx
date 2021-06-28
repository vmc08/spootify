import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import {
  useGetNewReleasesQuery,
  useGetFeaturedPlaylistsQuery,
  useGetCategoriesQuery,
} from "store/spotify/spotifyApiSlice";
import "../styles/_discover.scss";

const Discover = () => {
  const newReleases = useGetNewReleasesQuery(0);
  const featuredPlaylists = useGetFeaturedPlaylistsQuery(0);
  const categories = useGetCategoriesQuery(0);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases.data}
      />
      <DiscoverBlock
        text="FEATURED PLAYLISTS"
        id="featured"
        data={featuredPlaylists.data}
      />
      <DiscoverBlock text="BROWSE" id="browse" data={categories.data} />
    </div>
  );
};

export default Discover;
