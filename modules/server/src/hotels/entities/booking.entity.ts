import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from './room.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @ApiProperty({ type: 'string' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name })
  room: Room;

  @ApiProperty()
  @Prop()
  from: Date;

  @ApiProperty()
  @Prop()
  to: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.index({ from: 1, to: 1 });

BookingSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.user;
  return object;
};
