import {
  INewReleases,
  IFeaturedPlaylists,
  ICategories,
  TResponse,
} from "types/spotify";
import useSpotifyStore from "store/spotify/useSpotifyStore";
import useAxios from "./useAxios";

export type TQueryParams = {
  page?: number;
  callback?: () => void;
};

const LIMIT = 20;

const useSpotify = () => {
  const axios = useAxios();
  const { setResponseAction } = useSpotifyStore();

  const getNewReleases = async ({
    page = 0,
    callback,
  }: TQueryParams): Promise<TResponse> => {
    const result = await axios.get<INewReleases>(
      `/browse/new-releases?limit=${LIMIT}&offset=${page * LIMIT}`
    );
    const formattedResult = {
      data: result.data.albums.items.map((i) => ({
        name: i.name,
        images: i.images,
      })),
      next: result.data.albums.next,
      previous: result.data.albums.previous,
    };
    setResponseAction({ data: formattedResult, key: "newReleases" });
    callback?.();
    return formattedResult;
  };

  const getFeaturedPlaylists = async ({
    page = 0,
    callback,
  }: TQueryParams): Promise<TResponse> => {
    const result = await axios.get<IFeaturedPlaylists>(
      `/browse/featured-playlists?limit=${LIMIT}&offset=${page * LIMIT}`
    );
    const formattedResult = {
      data: result.data.playlists.items.map((i) => ({
        name: i.name,
        images: i.images,
      })),
      next: result.data.playlists.next,
      previous: result.data.playlists.previous,
    };
    setResponseAction({ data: formattedResult, key: "featuredPlaylists" });
    callback?.();
    return formattedResult;
  };

  const getCategories = async ({
    page = 0,
    callback,
  }: TQueryParams): Promise<TResponse> => {
    const result = await axios.get<ICategories>(
      `/browse/categories?limit=${LIMIT}&offset=${page * LIMIT}`
    );
    const formattedResult = {
      data: result.data.categories.items.map((i) => ({
        name: i.name,
        images: i.icons,
      })),
      next: result.data.categories.next,
      previous: result.data.categories.previous,
    };
    setResponseAction({ data: formattedResult, key: "categories" });
    callback?.();
    return formattedResult;
  };

  return { getNewReleases, getFeaturedPlaylists, getCategories };
};

export default useSpotify;
