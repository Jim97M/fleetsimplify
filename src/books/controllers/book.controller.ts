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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor (private bookService: BookService){}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard)
  @Post('add-book')
  create(@Body() book: Book, @Request() req): Promise<Book> {
    return this.bookService.createBook(req.user, book);
  } 

//   @UseGuards(JwtGuard, RolePermissionGuard)
//   @Put('update-book/:id')
//   update(@Param('id') id: number, @Body() book: Book): Observable<UpdateResult> {
//      return this.bookService.updateBook(id, book);  
// }
@Roles(Role.ADMIN)
@UseGuards(JwtGuard)
@Delete('remove-book/:id')
@ApiOkResponse({
  description: 'Book has been deleted',
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized. User is not an admin',
})
delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.bookService.deleteBook(id);
}
@UseGuards(JwtGuard)
@Get('get-all-books')
@ApiOkResponse({
  description: 'All Books are',
})
getAllBooks(): Observable<Book[]> {
  return this.bookService.findAllBooks();
}

@UseGuards(JwtGuard)
@Put('borrow-book/:id')
borrowBook(@Param('id') id: number, @Request() req): Observable<UpdateResult> {
  const userId = req.user.id;
  return this.bookService.borrowBook(id, userId);
}

@UseGuards(JwtGuard)
@Put('return-book/:id')
returnBook(@Param('id') id: number, @Request() req): Observable<UpdateResult> {
  const userId = req.user.id;
  return this.bookService.returnBook(id, userId);
}
}
