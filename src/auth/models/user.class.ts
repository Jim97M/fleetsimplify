import { IsEmail, IsString } from 'class-validator';
import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  id?: number;

  @ApiProperty({
    example: 'user@mail.com',
    required: true
 })
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '123453452a',
    required: true
 })
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'admin',
    required:false
 })
  role?: Role;
}
export interface RequestWithUser extends Request {
  user: User;
}