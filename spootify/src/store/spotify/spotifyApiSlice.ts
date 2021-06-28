import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import config from "config";
import { IReduxState } from "store/reducers";
import {
  INewReleases,
  IFeaturedPlaylists,
  ICategories,
  TResponse,
} from "types/spotify";

const PAGINATION_LIMIT = 20;

export const spotifyApiSlice = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const tokens = (getState() as IReduxState).tokens.value;
      if (tokens?.access_token) {
        headers.set(
          "authorization",
          `${tokens.token_type} ${tokens.access_token}`
        );
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNewReleases: builder.query<TResponse, number>({
      query: (page = 0) =>
        `browse/new-releases?limit=${PAGINATION_LIMIT}&offset=${
          page * PAGINATION_LIMIT
        }`,
      transformResponse: (result: INewReleases) => {
        const formattedResponse = result?.albums.items.map((i) => ({
          name: i.name,
          images: i.images,
        }));
        return {
          data: formattedResponse,
          next: result.albums.next,
          previous: result.albums.previous,
        };
      },
    }),
    getFeaturedPlaylists: builder.query<TResponse, number>({
      query: (offset = 0) =>
        `browse/featured-playlists?limit=20&offset=${offset}`,
      transformResponse: (result: IFeaturedPlaylists) => {
        const formattedResponse = result?.playlists.items.map((i) => ({
          name: i.name,
          images: i.images,
        }));
        return {
          data: formattedResponse,
          next: result.playlists.next,
          previous: result.playlists.previous,
        };
      },
    }),
    getCategories: builder.query<TResponse, number>({
      query: (offset = 0) => `browse/categories?limit=20&offset=${offset}`,
      transformResponse: (result: ICategories) => {
        const formattedResponse = result?.categories.items.map((i) => ({
          name: i.name,
          images: i.icons,
        }));
        return {
          data: formattedResponse,
          next: result.categories.next,
          previous: result.categories.previous,
        };
      },
    }),
  }),
});

export const {
  useGetNewReleasesQuery,
  useGetFeaturedPlaylistsQuery,
  useGetCategoriesQuery,
} = spotifyApiSlice;
