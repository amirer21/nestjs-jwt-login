import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DefaultResponseDto } from './dto/DefaultResponse.dto';

@Injectable()
export class AuthService {
    constructor(
        //user 리포지토리를 auth서비스에서 사용하기 위해 Inject.
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService //module 에 등록한 jwt를 서비스로 가져와서 사용
    ){}   

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<DefaultResponseDto>{  
        const ret = new DefaultResponseDto();
        try {
            this.userRepository.createUser(authCredentialsDto);
            ret.returnCode = 0;
            ret.returnMsg = "sign up success"
            return ret;
        } catch (error) {
            return error;
        }      
        //return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { id, password } = authCredentialsDto;//post로 전달받은 값의 dto
        const user = await this.userRepository.findOne({ id }); //id로 DB값 조회
       
        //bcrypt.compare 비밀번호 비교 확인
        if(user && (await bcrypt.compare(password, user.password))) {            
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { id };
            const accessToken = await this.jwtService.sign(payload); //jwt의 sign 메서드            
            return {accessToken}; //토큰 객체를 클라이언트에 응답
            //return 'login success';
        }  else {
            throw new UnauthorizedException('login failed')
        }
    }
}
