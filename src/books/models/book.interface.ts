import { User } from "src/auth/models/user.class";

export interface Book {
    id?: number;
  
    title?: string;
  
    subject_type?: string;
  
    author?: string;

    publisher?: string;
  
    createdAt?: Date;

    recorder?: User;

    isbn?: string; 

    description?: string;
  
    bib_key?: string;

    info_url?: string;

    preview?: string;
  
    preview_url?: string;
 
    thumbnail_url?: string;

}
