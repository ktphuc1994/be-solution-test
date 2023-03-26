import { MinMax } from '.';

export interface InterfaceLoginInfo {
  email: string;
  password: string;
}

export interface InterfaceUserInfo {
  fullName: string;
  age: number;
  birthday: string;
}

export interface InterfaceUser extends InterfaceUserInfo {
  id: string;
}

export interface InterfaceFilterUser {
  id: string;
  fullName: string;
  age: string;
}
export interface InterfaceFilterValue {
  idReg: RegExp;
  fullNameReg: RegExp;
  ageLimit: MinMax | undefined;
}

export interface InterfaceAgeRange extends Record<string, MinMax> {}
