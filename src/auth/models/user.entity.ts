import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
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
  
    @Column({ nullable: true })
    imagePath: string;
  
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(
      () => BookEntity, (bookEntity) => bookEntity.author)
      books: BookEntity[];  
  }
  