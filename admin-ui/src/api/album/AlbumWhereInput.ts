import { ArtistWhereUniqueInput } from "../artist/ArtistWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type AlbumWhereInput = {
  artist?: ArtistWhereUniqueInput;
  id?: StringFilter;
  picture?: StringFilter;
  title?: StringFilter;
};
