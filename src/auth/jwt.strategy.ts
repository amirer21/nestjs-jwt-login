import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

//Injectable : 이 클래스를 다른 클래스에서도 사용할 수 있도록 주입하는 데코레이션.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { //@nestjs/passport, jwt Strategy를 사용.
    constructor(
        @InjectRepository(UserRepository) //토큰이 유효한지 확인하고 payload에 들어있는 id를 DB에서 가져오기 위해 레포지토리를 주입(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'secret1223', //토큰 유효 확인
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //postman에서 확인해보기. 인증(Authorization) 타입은 : Bearer token.
        })
    }

    //DB에 있는지 조회
    async validate(payload) {
        const { id } = payload;
        const user: User = await this.userRepository.findOne({ id });

        if(!user) {
            console.log('user 없음');
            throw new UnauthorizedException();
        }
        console.log('user 있음');
        return user;
    }
}