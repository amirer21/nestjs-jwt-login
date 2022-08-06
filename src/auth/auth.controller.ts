import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string>  {
        return this.authService.signIn(authCredentialsDto);
    }
}
