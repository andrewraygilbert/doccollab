import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './../../environments/environment';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '7200s'}
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
