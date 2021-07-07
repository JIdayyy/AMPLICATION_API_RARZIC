import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AlbumWhereUniqueInput } from "../../album/base/AlbumWhereUniqueInput";
import { ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ArtistWhereUniqueInput } from "../../artist/base/ArtistWhereUniqueInput";
import { PlaylistWhereUniqueInput } from "../../playlist/base/PlaylistWhereUniqueInput";
@InputType()
class SongUpdateInput {
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  duration?: string;

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
  playlist?: PlaylistWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  s3Link?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string;
}
export { SongUpdateInput };
