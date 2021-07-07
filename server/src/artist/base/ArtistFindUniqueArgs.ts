import { ArgsType, Field } from "@nestjs/graphql";
import { ArtistWhereUniqueInput } from "./ArtistWhereUniqueInput";

@ArgsType()
class ArtistFindUniqueArgs {
  @Field(() => ArtistWhereUniqueInput, { nullable: false })
  where!: ArtistWhereUniqueInput;
}

export { ArtistFindUniqueArgs };
