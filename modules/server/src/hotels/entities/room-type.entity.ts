import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type RoomTypeDocument = HydratedDocument<RoomType>;

@Schema()
export class RoomType {
  @ApiProperty()
  @Prop({ unique: true })
  name: string;

  @ApiProperty()
  @Prop()
  price: number;

  @ApiProperty()
  @Prop()
  capacity: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);
