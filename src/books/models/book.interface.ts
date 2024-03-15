import { User } from "src/auth/models/user.class";

export interface Book {
    id?: number;
  
    name?: string;
  
    subject_type?: string;
  
    author?: string;

    publisher?: string;
  
    createdAt?: Date;

    recorder?: User;

    isbn: string; 

    title: string;

    coverImageUrl: string;

    description: string;
}
