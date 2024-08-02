import { UserType } from 'src/user/user.model';

export class UserResponse {
  id: string;
  fullName: string;
  nif: string;
  email: string;
  balance: number = 0;
  type: UserType;

  constructor(
    id: string,
    fullName: string,
    nif: string,
    email: string,
    type: UserType,
    balance: number = 0,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.nif = nif;
    this.email = email;
    this.type = type;
    this.balance = balance;
  }
}
