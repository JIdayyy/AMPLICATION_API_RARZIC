import { ArtistWhereInput } from "./ArtistWhereInput";
import { ArtistOrderByInput } from "./ArtistOrderByInput";

export type ArtistFindManyArgs = {
  where?: ArtistWhereInput;
  orderBy?: ArtistOrderByInput;
  skip?: number;
  take?: number;
};
