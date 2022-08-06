//import { CustomRepository } from "src/typeormCustom/repositoryCustom";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@EntityRepository(User)
//@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCreditionalsDto: AuthCredentialsDto): Promise<void>{
        const {id, password, email} = authCreditionalsDto;
        const user = this.create({ id, password, email });
        await this.save(user);
    }    
}