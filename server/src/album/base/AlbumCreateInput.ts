import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistWhereUniqueInput } from "../../artist/base/ArtistWhereUniqueInput";
import { ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class AlbumCreateInput {
  @ApiProperty({
    required: true,
    type: () => ArtistWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ArtistWhereUniqueInput)
  @Field(() => ArtistWhereUniqueInput)
  artist!: ArtistWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  picture!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { AlbumCreateInput };
