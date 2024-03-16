import { IsEmail, IsString } from 'class-validator';
import { Role } from './role.enum';

export class User {
  id?: number;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  role?: Role;
}
export interface RequestWithUser extends Request {
  user: User;
}