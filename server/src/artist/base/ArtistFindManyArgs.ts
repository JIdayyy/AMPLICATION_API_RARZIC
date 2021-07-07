import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistWhereInput } from "./ArtistWhereInput";
import { Type } from "class-transformer";
import { ArtistOrderByInput } from "./ArtistOrderByInput";

@ArgsType()
class ArtistFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ArtistWhereInput,
  })
  @Field(() => ArtistWhereInput, { nullable: true })
  @Type(() => ArtistWhereInput)
  where?: ArtistWhereInput;

  @ApiProperty({
    required: false,
    type: ArtistOrderByInput,
  })
  @Field(() => ArtistOrderByInput, { nullable: true })
  @Type(() => ArtistOrderByInput)
  orderBy?: ArtistOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ArtistFindManyArgs };
