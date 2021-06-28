export type { INewReleases } from "./new-releases";
export type { IFeaturedPlaylists } from "./featured-playlists";
export type { ICategories } from "./categories";

export type TResponse = {
  data: Array<{ images: Array<{ url: string }>; name: string }>;
  next: string | null;
  previous: string | null;
};
