import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class BookRoomParamsDto {
  @ApiProperty()
  @IsString()
  id: string;
}

export class BookRoomDto {
  @ApiProperty()
  @IsString()
  roomType: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  from: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  to: Date;
}
