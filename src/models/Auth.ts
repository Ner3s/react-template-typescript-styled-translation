import { IUser } from '~/models/User';

export interface IAuth {
  type: string;
  token: string;
  refreshToken: null;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRecoverPassword {
  token: string;
  password: string;
  password_confirmation: string;
}
