import { Album } from "../album/Album";
import { Artist } from "../artist/Artist";
import { Playlist } from "../playlist/Playlist";

export type Song = {
  album?: Album;
  artist?: Artist;
  createdAt: Date;
  duration: string;
  id: string;
  playlist?: Playlist | null;
  s3Link: string;
  title: string;
  updatedAt: Date;
};
