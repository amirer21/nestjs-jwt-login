import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";
import { UserInfoResponseDto } from './dto/userInfoResponse.dto';

//유저 정보를 가져오기위한 데코레이션
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): UserInfoResponseDto => { //ExecutionContext 타입, User entity
    const ret = new UserInfoResponseDto();
    
    //return req.user; //request 객체에서 user만 가져온다.
    try {       
        const req = ctx.switchToHttp().getRequest(); 
        ret.id = req.user.id;
        ret.email = req.user.email;
        ret.returnCode = 0;
        ret.returnMsg = "조회완료";
    } catch (error) {
        return error;
    }
    return ret;
})