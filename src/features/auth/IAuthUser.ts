import { UserRole } from '../../enums/UserRole';

export interface IAuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: UserRole;
}
