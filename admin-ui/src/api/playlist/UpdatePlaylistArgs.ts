import { PlaylistWhereUniqueInput } from "./PlaylistWhereUniqueInput";
import { PlaylistUpdateInput } from "./PlaylistUpdateInput";

export type UpdatePlaylistArgs = {
  where: PlaylistWhereUniqueInput;
  data: PlaylistUpdateInput;
};
