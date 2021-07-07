import { Artist as TArtist } from "../api/artist/Artist";

export const ARTIST_TITLE_FIELD = "name";

export const ArtistTitle = (record: TArtist) => {
  return record.name;
};
