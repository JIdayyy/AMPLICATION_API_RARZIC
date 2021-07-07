import { AlbumWhereUniqueInput } from "../album/AlbumWhereUniqueInput";
import { ArtistWhereUniqueInput } from "../artist/ArtistWhereUniqueInput";
import { PlaylistWhereUniqueInput } from "../playlist/PlaylistWhereUniqueInput";

export type SongCreateInput = {
  album: AlbumWhereUniqueInput;
  artist: ArtistWhereUniqueInput;
  duration: string;
  playlist?: PlaylistWhereUniqueInput | null;
  s3Link: string;
  title: string;
};
