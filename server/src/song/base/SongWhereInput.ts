import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AlbumWhereUniqueInput } from "../../album/base/AlbumWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ArtistWhereUniqueInput } from "../../artist/base/ArtistWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PlaylistWhereUniqueInput } from "../../playlist/base/PlaylistWhereUniqueInput";
@InputType()
class SongWhereInput {
  @ApiProperty({
    required: false,
    type: () => AlbumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => AlbumWhereUniqueInput)
  @IsOptional()
  @Field(() => AlbumWhereUniqueInput, {
    nullable: true,
  })
  album?: AlbumWhereUniqueInput;

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
  duration?: StringFilter;

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
    type: () => PlaylistWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlaylistWhereUniqueInput)
  @IsOptional()
  @Field(() => PlaylistWhereUniqueInput, {
    nullable: true,
  })
  playlist?: PlaylistWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  s3Link?: StringFilter;

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
export { SongWhereInput };
