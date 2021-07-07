import { ArgsType, Field } from "@nestjs/graphql";
import { PlaylistWhereUniqueInput } from "./PlaylistWhereUniqueInput";

@ArgsType()
class PlaylistFindUniqueArgs {
  @Field(() => PlaylistWhereUniqueInput, { nullable: false })
  where!: PlaylistWhereUniqueInput;
}

export { PlaylistFindUniqueArgs };
