import { ArgsType, Field } from "@nestjs/graphql";
import { ArtistWhereUniqueInput } from "./ArtistWhereUniqueInput";
import { ArtistUpdateInput } from "./ArtistUpdateInput";

@ArgsType()
class UpdateArtistArgs {
  @Field(() => ArtistWhereUniqueInput, { nullable: false })
  where!: ArtistWhereUniqueInput;
  @Field(() => ArtistUpdateInput, { nullable: false })
  data!: ArtistUpdateInput;
}

export { UpdateArtistArgs };
