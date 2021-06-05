export interface IAuth {
  type: string;
  token: string;
  refreshToken: null;
}

export interface ICredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface IRecoverPassword {
  token: string;
  password: string;
  password_confirmation: string;
}
