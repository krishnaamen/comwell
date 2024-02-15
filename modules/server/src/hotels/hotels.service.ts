import { Injectable, OnModuleInit } from '@nestjs/common';
import { Hotel } from './entities/hotel.entity';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomType } from './entities/room-type.entity';
import { Room, RoomDocument } from './entities/room.entity';
import { Booking } from './entities/booking.entity';
import { InvalidRoomTypeError } from './errors/invalid-room-type.error';
import { UnavailableRoomError } from './errors/unavailable-room.error';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class HotelsService implements OnModuleInit {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
    @InjectModel(RoomType.name) private roomTypeModel: Model<RoomType>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  findAll() {
    return this.hotelModel.find();
  }

  // TODO: Add capacity to filter. (lte)
  async findRooms(id: string, capacity?: number, from?: Date, to?: Date) {
    const hotelRooms = await this.roomModel.find({ hotel: id });

    const filter: FilterQuery<RoomDocument> = {
      room: { $in: hotelRooms },
    };

    if (from !== undefined && to !== undefined) {
      filter.$nor = [{ from: { $gte: to } }, { to: { $lte: from } }];
    }

    const bookingsForHotelRooms = await this.bookingModel
      .find(filter)
      .populate({
        path: 'room',
        populate: {
          path: 'type',
        },
      });

    const bookedRoomTypes = bookingsForHotelRooms.map(
      (bookingsForHotel) => bookingsForHotel.room.type,
    );

    return this.roomTypeModel.find({
      _id: { $nin: bookedRoomTypes },
      ...(capacity !== undefined && { capacity: { $gte: capacity } }),
    });
  }

  async bookRoom(
    user: UserDocument,
    id: string,
    roomType: string,
    from: Date,
    to: Date,
  ) {
    const roomTypeDocument = await this.roomTypeModel.findOne({
      name: roomType,
    });
    if (roomTypeDocument === null) {
      throw new InvalidRoomTypeError(roomType);
    }

    const hotelRooms = await this.roomModel.find({
      hotel: id,
      type: roomTypeDocument._id,
    });

    const bookingsForHotelRooms = await this.bookingModel
      .find({
        room: { $in: hotelRooms },
        $nor: [{ from: { $gte: to } }, { to: { $lte: from } }],
      })
      .populate('room');

    if (bookingsForHotelRooms.length > 0) {
      throw new UnavailableRoomError(id, roomType, from, to);
    }

    const bookedRooms = bookingsForHotelRooms.map(
      (bookingForHotelRooms) => bookingForHotelRooms.room,
    );
    const roomToBook = await this.roomModel.findOne({
      type: roomTypeDocument._id,
      _id: { $nin: bookedRooms },
    });

    const booking = new this.bookingModel({
      user: user._id,
      room: roomToBook._id,
      from,
      to,
    }).save();

    return booking;
  }

  async onModuleInit() {
    const countOfHotels = await this.hotelModel.countDocuments();
    if (countOfHotels > 0) {
      await this.hotelModel.deleteMany();
      await this.roomTypeModel.deleteMany();
      await this.roomModel.deleteMany();
      await this.bookingModel.deleteMany();
    }

    const insertedHotels = await this.hotelModel.insertMany([
      { name: 'Aarhus House', city: 'Aarhus', region: 'Jytland' },
      { name: 'Odense House', city: 'Odense', region: 'Fyn' },
      { name: 'Copenhagen House', city: 'Copenhagen', region: 'Zealand' },
    ]);

    const insertedRoomTypes = await this.roomTypeModel.insertMany([
      { name: 'standard', price: '100', capacity: 2 },
      { name: 'superior', price: '250', capacity: 3 },
      { name: 'suite', price: '500', capacity: 5 },
    ]);

    for (const insertedHotel of insertedHotels) {
      for (const insertedRoomType of insertedRoomTypes) {
        const numberOfRooms = {
          standard: 50,
          superior: 25,
          suite: 10,
        }[insertedRoomType.name];

        const rooms = [];
        for (let i = 0; i < numberOfRooms; i++) {
          const room = new this.roomModel({
            hotel: insertedHotel,
            type: insertedRoomType,
          });
          rooms.push(room.save());
        }
        await Promise.all(rooms);
      }
    }
  }
}
