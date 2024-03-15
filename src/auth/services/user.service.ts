import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models/user.class";
import { Observable, from, map } from "rxjs";
import { UserEntity } from "../models/user.entity";

import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
   ){}

   findByUserId(id: number) : Observable<User> {
        return from(this.userRepository.findOne({where: {id}, relations: ['books']}),
        ).pipe(
            map((user: User) => {
              if(!user){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
              }
              delete user.password;
              return user;
            }
        )
        );
   }
}
