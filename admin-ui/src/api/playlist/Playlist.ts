import { Song } from "../song/Song";

export type Playlist = {
  createdAt: Date;
  description: string | null;
  id: string;
  songs?: Array<Song>;
  title: string;
  updatedAt: Date;
};
