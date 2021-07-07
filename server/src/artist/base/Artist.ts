import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Album } from "../../album/base/Album";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Song } from "../../song/base/Song";
@ObjectType()
class Artist {
  @ApiProperty({
    required: false,
    type: () => [Album],
  })
  @ValidateNested()
  @Type(() => Album)
  @IsOptional()
  albums?: Array<Album>;

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
  name!: string;

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
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Artist };
