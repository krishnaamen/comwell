import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { FindRoomsParamsDto } from './dto/find-rooms-params.dto';
import { FindRoomsQueryDto } from './dto/find-rooms-query.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Hotel } from './entities/hotel.entity';
import { RoomType } from './entities/room-type.entity';
import { Public } from 'src/auth/public.decorator';
import { BookRoomDto, BookRoomParamsDto } from './dto/book-room.dto';
import { InvalidRoomTypeError } from './errors/invalid-room-type.error';
import { User } from 'src/users/user.decorator';
import { UserDocument } from 'src/users/entities/user.entity';
import { UnavailableRoomError } from './errors/unavailable-room.error';
import { Booking } from './entities/booking.entity';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @ApiOkResponse({
    type: Hotel,
    isArray: true,
  })
  @Public()
  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @ApiOkResponse({
    type: RoomType,
    isArray: true,
  })
  @Public()
  @Get(':id/rooms')
  findRooms(
    @Param() params: FindRoomsParamsDto,
    @Query() query: FindRoomsQueryDto,
  ) {
    return this.hotelsService.findRooms(
      params.id,
      query.capacity,
      query.from,
      query.to,
    );
  }

  @ApiOkResponse({
    type: Booking,
  })
  @ApiBearerAuth()
  @Post(':id/book')
  async bookRoom(
    @User() user: UserDocument,
    @Param() params: BookRoomParamsDto,
    @Body() bookRoomDto: BookRoomDto,
  ) {
    try {
      return await this.hotelsService.bookRoom(
        user,
        params.id,
        bookRoomDto.roomType,
        bookRoomDto.from,
        bookRoomDto.to,
      );
    } catch (err) {
      if (err instanceof InvalidRoomTypeError) {
        throw new BadRequestException(
          `invalid room type: ${bookRoomDto.roomType}`,
        );
      }
      if (err instanceof UnavailableRoomError) {
        throw new BadRequestException(`unavailable room for the input`);
      }
      throw err;
    }
  }
}
