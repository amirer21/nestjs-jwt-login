//import { CustomRepository } from "src/typeormCustom/repositoryCustom";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
//@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCreditionalsDto: AuthCredentialsDto): Promise<void>{
        const {id, password, email} = authCreditionalsDto;
        //const user = this.create({ id, password, email });

        /* 비밀번호 salt+hash Start */
        const salt = await bcrypt.genSalt(); //salt 생성
        const hashedPassword = await bcrypt.hash(password, salt); //hash 암호화
        const user = this.create({ id, password: hashedPassword, email });
        /* 비밀번호 salt+hash END */

        //DB 저장시 에러발생하면 별도의 에러코드 전달
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('The ID that already exists.');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }    
}