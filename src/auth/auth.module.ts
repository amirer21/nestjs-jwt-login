import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
//import { TypeOrmCustomModule } from '.././typeormCustom/typeormModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository])
    //TypeOrmCustomModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
