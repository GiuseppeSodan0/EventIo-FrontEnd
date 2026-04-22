import { Role } from './enums/user-type';

export class LoginRequestDto {
  email!: string;
  password!: string;
}