import { ArgsType, Field } from "@nestjs/graphql";
import { ArtistWhereUniqueInput } from "./ArtistWhereUniqueInput";

@ArgsType()
class DeleteArtistArgs {
  @Field(() => ArtistWhereUniqueInput, { nullable: false })
  where!: ArtistWhereUniqueInput;
}

export { DeleteArtistArgs };
