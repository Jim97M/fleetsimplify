import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "../models/book.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from "src/auth/models/user.class";
import { Book } from "../models/book.interface";
import { Observable, from } from "rxjs";
import { RedisRepository } from "../infrastructure/redis/repository/redis.repository";
import { Role } from "src/auth/models/role.enum";
import { RedisServiceClass } from "./redis.service";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly redisServiceClass: RedisServiceClass,
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ){}

 async createBook(user: User, book: Book): Promise<Book> {
    book.recorder = user;
    const bookInfo = await this.redisServiceClass.getBookInfo(book.isbn);
    
    book.title = bookInfo.title;
    book.author = bookInfo.author;
    book.publisher = bookInfo.publisher;
    book.description = bookInfo.description;
    book.name = bookInfo.name;
    book.recorder = user;
    book.subject_type = bookInfo.subject_type;
    book.coverImageUrl = bookInfo.coverImageUrl;
    book.isbn = bookInfo.isbn;
    book.createdAt = new Date();
    const savedBook = await this.bookRepository.save(book);
    
    // Return the saved book
    return savedBook;
}


  findAllBooks(): Observable<Book[]> {
    return from(this.bookRepository.find());
  }

  updateBook(id: number, book: Book): Observable<UpdateResult> {
     return from(this.bookRepository.update(id, book)); 
  }

  deleteBook(id: number): Observable<DeleteResult> {
     return from(this.bookRepository.delete(id));
  }

  findBookById(id: number): Observable<Book> {
     return from(this.bookRepository.findOne({where: {id}, relations: ['books']}));
  }
  borrowBook(userId: number, bookId: number): Observable<UpdateResult> {
    return from(this.bookRepository.update({ id: bookId, recorder: null }, { recorder: userId as any }));
  }

  returnBook(userId: number, bookId: number): Observable<UpdateResult> {
    return from(this.bookRepository.update({ id: bookId, recorder: null }, { recorder: userId as any }));
  }


  async saveBook(user: User, bookData: Book): Promise<Book> {

    return this.bookRepository.save(bookData);
}

async getBook(bookId: string): Promise<Book | null>{
 const book = await this.redisRepository.get(Role.BOOK, bookId);
 return book ? JSON.parse(book) : null;
}


}
