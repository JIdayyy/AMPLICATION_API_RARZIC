import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PlaylistWhereInput } from "./PlaylistWhereInput";
import { Type } from "class-transformer";
import { PlaylistOrderByInput } from "./PlaylistOrderByInput";

@ArgsType()
class PlaylistFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PlaylistWhereInput,
  })
  @Field(() => PlaylistWhereInput, { nullable: true })
  @Type(() => PlaylistWhereInput)
  where?: PlaylistWhereInput;

  @ApiProperty({
    required: false,
    type: PlaylistOrderByInput,
  })
  @Field(() => PlaylistOrderByInput, { nullable: true })
  @Type(() => PlaylistOrderByInput)
  orderBy?: PlaylistOrderByInput;

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

export { PlaylistFindManyArgs };
