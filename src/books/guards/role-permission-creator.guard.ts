import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BookService } from "../services/book.service";
import { User } from "src/auth/models/user.class";
import { Observable, map, switchMap } from "rxjs";
import { UserService } from "src/auth/services/user.service";
import { Book } from "../models/book.interface";

@Injectable()
export class RolePermissionGuard implements CanActivate {
   constructor(
       private userService: UserService,
       private bookService: BookService,
   ){}

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const request = context.switchToHttp().getRequest();
       const {user, params} : {user: User; params: {id: number}} = request;

       if (!user || !params) return false;

       const userId = user.id;

       const bookId = params.id;

       return this.userService.findByUserId(userId).pipe(
           switchMap((user: User) => 
               this.bookService.findBookById(bookId).pipe(
                   map((book: Book) => {
                       return book.recorder === userId;
                   }),
               ),

                )
       );
                }
   }
