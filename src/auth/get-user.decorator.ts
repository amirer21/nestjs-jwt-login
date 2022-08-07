import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

//유저 정보를 가져오기위한 데코레이션
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => { //ExecutionContext 타입, User entity
    const req = ctx.switchToHttp().getRequest();
    return req.user; //request 객체에서 user만 가져온다.
})