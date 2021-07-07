import { SortOrder } from "../../util/SortOrder";

export type AlbumOrderByInput = {
  artistId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  picture?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
