import { ArtistWhereUniqueInput } from "../artist/ArtistWhereUniqueInput";

export type AlbumCreateInput = {
  artist: ArtistWhereUniqueInput;
  picture: string;
  title: string;
};
