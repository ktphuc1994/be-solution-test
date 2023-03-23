export interface InterfaceLoginInfo {
  email: string;
  password: string;
}

export interface InterfaceUserInfo {
  fullName: string;
  age: number;
}

export interface InterfaceUser extends InterfaceUserInfo {
  id: string;
}
