import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtDto, LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async register(registerDto: RegisterDto) {
    try {
      const ExistingUser = await prisma.user.findUnique({
        where: {
          email: registerDto.email,
        },
      });
      if (ExistingUser) {
        throw { status: 400, message: 'User already exists' };
      }
      const hashedPassword = await argon2.hash(registerDto.password);
      const newUser = await prisma.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword,
        },
      });
      return { success: true };
    } catch (error) {
      throw { status: 500, message: 'Invalid input' };
    }
  }
  async login(loginDto: LoginDto) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: loginDto.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!(await argon2.verify(user.password, loginDto.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = this.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });
      return { success: true, email: user.email, access_token: token };
    } catch (error) {
      throw { status: 500, message: 'Invalid input' };
    }
  }
  private generateToken(user: JwtDto) {
    return this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
