import { ArgsType, Field } from "@nestjs/graphql";
import { PlaylistCreateInput } from "./PlaylistCreateInput";

@ArgsType()
class CreatePlaylistArgs {
  @Field(() => PlaylistCreateInput, { nullable: false })
  data!: PlaylistCreateInput;
}

export { CreatePlaylistArgs };
