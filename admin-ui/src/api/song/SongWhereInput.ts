import { AlbumWhereUniqueInput } from "../album/AlbumWhereUniqueInput";
import { ArtistWhereUniqueInput } from "../artist/ArtistWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PlaylistWhereUniqueInput } from "../playlist/PlaylistWhereUniqueInput";

export type SongWhereInput = {
  album?: AlbumWhereUniqueInput;
  artist?: ArtistWhereUniqueInput;
  duration?: StringFilter;
  id?: StringFilter;
  playlist?: PlaylistWhereUniqueInput;
  s3Link?: StringFilter;
  title?: StringFilter;
};
