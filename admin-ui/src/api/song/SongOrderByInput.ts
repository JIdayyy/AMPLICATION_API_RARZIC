import { SortOrder } from "../../util/SortOrder";

export type SongOrderByInput = {
  albumId?: SortOrder;
  artistId?: SortOrder;
  createdAt?: SortOrder;
  duration?: SortOrder;
  id?: SortOrder;
  playlistId?: SortOrder;
  s3Link?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
