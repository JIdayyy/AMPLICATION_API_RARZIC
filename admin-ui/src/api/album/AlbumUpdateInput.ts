import { ArtistWhereUniqueInput } from "../artist/ArtistWhereUniqueInput";

export type AlbumUpdateInput = {
  artist?: ArtistWhereUniqueInput;
  picture?: string;
  title?: string;
};
