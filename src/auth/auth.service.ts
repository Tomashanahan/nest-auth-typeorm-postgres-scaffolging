import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
      token: this.getJwt({ id: user.id }),
    };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {
      const user = await this.userRepository.findOne({
        email,
      });

      if (!user) throw new UnauthorizedException(`User ${email} not found`);
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(`Password ${password} not valid`);

      return {
        ...user,
        token: this.getJwt({ id: user.id }),
      };
    } catch (error) {}

    return loginUserDto;
  }
}
