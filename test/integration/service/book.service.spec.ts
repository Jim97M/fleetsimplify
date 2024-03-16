import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookService } from 'src/books/services/book.service';
import { BookEntity } from 'src/books/models/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/models/user.class';
import { Observable, of } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { RedisServiceClass } from 'src/books/services/redis.service';
import { last, tap } from 'rxjs/operators';

// Mock User class for testing purposes
class MockUser extends User {}

// Mock BookEntity repository
class MockBookRepository {
  create() {}
  save() {}
  find() {}
  update() {}
  delete() {}
  findOne() {}
}

// Mock RedisServiceClass
class MockRedisServiceClass {
  getBookInfo(isbn: string) {
    return Promise.resolve({
      title: 'Mock Book',
      author: 'Mock Author',
      publisher: 'Mock Publisher',
      description: 'Mock Description',
      name: 'Mock Name',
      subject_type: 'Mock Subject',
      coverImageUrl: 'mock-image-url',
      isbn: isbn,
    });
  }
}

describe('BookService', () => {
  let service: BookService;
  let repository: Repository<BookEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: RedisServiceClass, useClass: MockRedisServiceClass },
        { provide: getRepositoryToken(BookEntity), useClass: MockBookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('borrowBook', () => {
    it('should update the recorder field of the book with the user ID', async () => {
      const bookId = 1;
      const userId = 1;

      const updateResult: UpdateResult = { affected: 1, raw: [], generatedMaps: [] };
      jest.spyOn(repository, 'update').mockReturnValueOnce(of(updateResult).pipe(last()).toPromise());

      const result: UpdateResult = await service.borrowBook(userId, bookId).toPromise();
      expect(result).toEqual(updateResult);
    });
  });

  describe('returnBook', () => {
    it('should update the recorder field of the book to null', async () => {
      const bookId = 1;
      const userId = 1;

      const updateResult: UpdateResult = { affected: 1, raw: [], generatedMaps: [] };
      jest.spyOn(repository, 'update').mockReturnValueOnce(of(updateResult).pipe(last()).toPromise());

      const result: UpdateResult = await service.returnBook(userId, bookId).toPromise();
      expect(result).toEqual(updateResult);
    });
  });
});
