import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AlbumWhereUniqueInput } from "../../album/base/AlbumWhereUniqueInput";
import { ValidateNested, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ArtistWhereUniqueInput } from "../../artist/base/ArtistWhereUniqueInput";
import { PlaylistWhereUniqueInput } from "../../playlist/base/PlaylistWhereUniqueInput";
@InputType()
class SongCreateInput {
  @ApiProperty({
    required: true,
    type: () => AlbumWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => AlbumWhereUniqueInput)
  @Field(() => AlbumWhereUniqueInput)
  album!: AlbumWhereUniqueInput;

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
  duration!: string;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  s3Link!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
}
export { SongCreateInput };
