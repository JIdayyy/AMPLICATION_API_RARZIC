import { ArgsType, Field } from "@nestjs/graphql";
import { PlaylistWhereUniqueInput } from "./PlaylistWhereUniqueInput";

@ArgsType()
class DeletePlaylistArgs {
  @Field(() => PlaylistWhereUniqueInput, { nullable: false })
  where!: PlaylistWhereUniqueInput;
}

export { DeletePlaylistArgs };
