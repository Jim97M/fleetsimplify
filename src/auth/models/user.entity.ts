import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { ApiProperty } from '@nestjs/swagger';
  import { Role } from './role.enum';
  import { BookEntity } from '../../books/models/book.entity';

  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    
    @Column({ unique: true })
    email: string;
  
    
    @Column({ select: false })
    password: string;
  
    
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(
      () => BookEntity, (bookEntity) => bookEntity.recorder)
      books: BookEntity[];  

  }
  