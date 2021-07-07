import { ArgsType, Field } from "@nestjs/graphql";
import { ArtistCreateInput } from "./ArtistCreateInput";

@ArgsType()
class CreateArtistArgs {
  @Field(() => ArtistCreateInput, { nullable: false })
  data!: ArtistCreateInput;
}

export { CreateArtistArgs };
