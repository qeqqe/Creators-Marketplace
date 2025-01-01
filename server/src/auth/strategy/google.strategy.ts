import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/api/auth/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    access_token: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails } = profile;
      const email = emails[0].value;

      let user = await this.prismaService.user.findFirst({
        where: {
          OR: [{ googleId: profile.id }, { email: email }],
        },
      });

      if (!user) {
        user = await this.prismaService.user.create({
          data: {
            email,
            name: name.givenName + ' ' + name.familyName,
            googleId: profile.id,
          },
        });
      }

      done(null, user);
      return user;
    } catch (error) {
      done(error, false);
    }
  }
}
