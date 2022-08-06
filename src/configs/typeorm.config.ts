import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from 'path';
import { User } from "src/auth/user.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nest-jwt',
    //entities: [__dirname + '/../**/*.entity.{js,ts}'],    
    entities: [__dirname + '/../auth/*.entity.{ts,js}'],   
    //entities: [User],
    synchronize: true,
    autoLoadEntities: true
}

console.log(typeORMConfig);