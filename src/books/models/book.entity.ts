import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
  } from 'typeorm';
  
  import { UserEntity } from '../../auth/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';
  
  @Entity('books')
  export class BookEntity {
  
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
      example: 'Title',
      required: true
   })
    @Column({ default: '' })
    title: string;


    
    @ApiProperty({
      example: 'Subject Type',
      required: true
   })
    @Column({ default: '' })
    subject_type: string;


    @ApiProperty({
      example: 'Author',
      required: true
   })
    @Column({ default: '' })
    author: string;


    @ApiProperty({
      example: 'Publisher',
      required: true
   })
    @Column({ default: '' })
    publisher: string;


    @ApiProperty({
      example: 'ISBN',
      required: true
   })
    @Column({ default: '' })
    isbn: string; 

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.books)
    recorder: UserEntity;


    @ApiProperty({
      example: 'Description',
      required: true
   })
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
  