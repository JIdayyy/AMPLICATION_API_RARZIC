import { SortOrder } from "../../util/SortOrder";

export type ArtistOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  picture?: SortOrder;
  updatedAt?: SortOrder;
};
