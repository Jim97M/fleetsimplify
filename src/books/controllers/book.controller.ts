import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    Res,
    UseGuards,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolePermissionGuard } from '../guards/role-permission-creator.guard';

@Controller('books')
export class BooksController {
  constructor (private bookService: BookService){}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() book: Book, @Request() req): Promise<Book> {
    return this.bookService.createBook(req.user, book);
  } 

  @UseGuards(JwtGuard, RolePermissionGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() book: Book): Observable<UpdateResult> {
     return this.bookService.updateBook(id, book);  
}

@UseGuards(JwtGuard)
@Delete(':id')
delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.bookService.deleteBook(id);
}

@UseGuards(JwtGuard)
@Put(':id/borrow')
borrowBook(@Param('id') id: number, @Request() req): Observable<UpdateResult> {
  const userId = req.user.id;
  return this.bookService.borrowBook(userId, id);
}

@UseGuards(JwtGuard, RolePermissionGuard)
@Put(':id/return')
returnBook(@Param('id') id: number, @Request() req): Observable<UpdateResult> {
  const userId = req.user.id;
  return this.bookService.returnBook(userId, id);
}

}
