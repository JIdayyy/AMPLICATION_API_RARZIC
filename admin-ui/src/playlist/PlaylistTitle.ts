import { Playlist as TPlaylist } from "../api/playlist/Playlist";

export const PLAYLIST_TITLE_FIELD = "title";

export const PlaylistTitle = (record: TPlaylist) => {
  return record.title;
};
