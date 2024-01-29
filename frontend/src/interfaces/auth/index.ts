export interface IResRegister {
  username: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}

export interface IRespLogin {
  data: Data;
  token: string;
}

export interface Data {
  id: string;
  username: string;
  email: string;
}

export interface IRespVerify {
  data: Data;
  token: string;
}

export interface Data {
  id: string;
  username: string;
  email: string;
}
