import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('books')
  export class BookEntity {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    subject_type: string;

    @Column({ default: '' })
    author: string;

    @Column({ default: '' })
    publisher: string;

    @Column({ default: '' })
    isbn: string; 

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.books)
    recorder: UserEntity;

    @Column({ default: '' })
    title: string;

    @Column({ default: '' })
    coverImageUrl: string;

    @Column({ default: '' })
    description: string;
  }
  