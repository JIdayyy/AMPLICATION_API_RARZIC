import { ArgsType, Field } from "@nestjs/graphql";
import { PlaylistWhereUniqueInput } from "./PlaylistWhereUniqueInput";
import { PlaylistUpdateInput } from "./PlaylistUpdateInput";

@ArgsType()
class UpdatePlaylistArgs {
  @Field(() => PlaylistWhereUniqueInput, { nullable: false })
  where!: PlaylistWhereUniqueInput;
  @Field(() => PlaylistUpdateInput, { nullable: false })
  data!: PlaylistUpdateInput;
}

export { UpdatePlaylistArgs };
