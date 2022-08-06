import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    id: string;

    @IsString()
    @MinLength(5)
    @MaxLength(10)    
    //비밀번호 영어와 숫자만 가능하도록 메시지 알리
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'only english and number'
    })
    password: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    email: string;

}