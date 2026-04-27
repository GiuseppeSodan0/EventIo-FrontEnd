import { Role } from './enums/user-type';

export class LoginResponseDto {
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  role!: Role;
  success!: boolean;
  password?: string;
}