import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
  } from 'typeorm';
  
  import { UserEntity } from '../../auth/models/user.entity';
  
  @Entity('books')
  export class BookEntity {
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    title: string;


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
    description: string;

    @Column({ default: '' })
    bib_key: string;

    @Column({ default: '' })
    info_url: string;

    @Column({ default: '' })
    preview: string;
 
    @Column({ default: '' })
    preview_url: string;

    @Column({ default: '' })
    thumbnail_url: string;

  }
  