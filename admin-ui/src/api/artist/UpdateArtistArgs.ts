import { ArtistWhereUniqueInput } from "./ArtistWhereUniqueInput";
import { ArtistUpdateInput } from "./ArtistUpdateInput";

export type UpdateArtistArgs = {
  where: ArtistWhereUniqueInput;
  data: ArtistUpdateInput;
};
