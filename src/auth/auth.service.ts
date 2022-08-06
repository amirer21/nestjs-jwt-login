import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        //user 리포지토리를 auth서비스에서 사용하기 위해 Inject.
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}   

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
