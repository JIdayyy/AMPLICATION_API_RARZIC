import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Album } from "../../album/base/Album";
import { ValidateNested, IsDate, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Artist } from "../../artist/base/Artist";
import { Playlist } from "../../playlist/base/Playlist";
@ObjectType()
class Song {
  @ApiProperty({
    required: true,
    type: () => Album,
  })
  @ValidateNested()
  @Type(() => Album)
  album?: Album;

  @ApiProperty({
    required: true,
    type: () => Artist,
  })
  @ValidateNested()
  @Type(() => Artist)
  artist?: Artist;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  duration!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => Playlist,
  })
  @ValidateNested()
  @Type(() => Playlist)
  @IsOptional()
  playlist?: Playlist | null;

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

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Song };
