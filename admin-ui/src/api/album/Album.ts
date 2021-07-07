import { Artist } from "../artist/Artist";
import { Song } from "../song/Song";

export type Album = {
  artist?: Artist;
  createdAt: Date;
  id: string;
  picture: string;
  songs?: Array<Song>;
  title: string;
  updatedAt: Date;
};
