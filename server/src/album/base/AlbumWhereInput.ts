import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistWhereUniqueInput } from "../../artist/base/ArtistWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StringFilter } from "../../util/StringFilter";
@InputType()
class AlbumWhereInput {
  @ApiProperty({
    required: false,
    type: () => ArtistWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ArtistWhereUniqueInput)
  @IsOptional()
  @Field(() => ArtistWhereUniqueInput, {
    nullable: true,
  })
  artist?: ArtistWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  picture?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  title?: StringFilter;
}
export { AlbumWhereInput };
