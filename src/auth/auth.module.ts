import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
//import { TypeOrmCustomModule } from '.././typeormCustom/typeormModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    //TypeOrmCustomModule.forCustomRepository([UserRepository])
    JwtModule.register({
      secret: 'secret1223', //secret text
      signOptions:{
        expiresIn: 60 * 60 // 토큰 유효시간 : 1시간
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}) //passport 기본전략 : jwt
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
