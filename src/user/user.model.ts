export enum UserType {
  CUSTOMER,
  PROVIDER,
}

export class User {
  id: string;
  fullName: string;
  nif: string;
  email: string;
  password: string;
  type: UserType;

  constructor(
    id: string,
    fullName: string,
    nif: string,
    email: string,
    password: string,
    type: UserType,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.nif = nif;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
