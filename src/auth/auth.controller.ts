import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    //Auth service를 controller에 주입
    constructor( private authService: AuthService){}

    //localhost:3000/auth/signup
    @Post('/signup')
    //ValidationPipe : 유효성체크
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>  {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    //nestjs 미들웨어 중 하나. 인증 미들웨어로 지정된 경로를 통과할 수 있는 요청을 구분한다.
    //AuthGuard()는 @nestjs/passport
    @UseGuards(AuthGuard()) 
    test(@Req() req){
        console.log('test req : ', req);
    }
}
