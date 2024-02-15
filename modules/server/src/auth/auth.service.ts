import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LogInDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      password: plainTextPassword,
    } = signUpDto;

    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    return this.usersService.create({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user === null) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    return user;
  }

  async login(loginDto: LogInDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (user === null) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
