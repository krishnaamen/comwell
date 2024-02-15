import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { EmailIsTakenError } from './errors/email-is-taken.error';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, birthDate, email, password } = createUserDto;
    const userToCreate = new this.userModel({
      firstName,
      lastName,
      birthDate,
      email,
      hashedPassword: password,
    });

    try {
      return await userToCreate.save();
    } catch (err) {
      //duplicate key error
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new EmailIsTakenError(email);
      }
      throw err;
    }
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }
}
