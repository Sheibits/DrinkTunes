import { User } from './User';

export class Role {
  roleId: number = 0;
  roleName: string = '';
  user!: User;
}
