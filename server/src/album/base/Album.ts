import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Artist } from "../../artist/base/Artist";
import { ValidateNested, IsDate, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Song } from "../../song/base/Song";
@ObjectType()
class Album {
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
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  picture!: string;

  @ApiProperty({
    required: false,
    type: () => [Song],
  })
  @ValidateNested()
  @Type(() => Song)
  @IsOptional()
  songs?: Array<Song>;

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
export { Album };
