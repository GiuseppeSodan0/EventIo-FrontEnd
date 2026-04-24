import { Role } from './enums/user-type';

export class LoginResponseDto {
  id!: number;
  name!: string;
  surname!: string;
  email!: string;
  role!: Role;
  status!: boolean;
  password?: string;
}