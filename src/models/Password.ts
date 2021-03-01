export interface IForgotPasswordResponse {
  message: string;
}

export interface IValidateCodeResponse {
  code: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface IResetPasswordResponse {
  session: {
    type: string;
    token: string;
    refreshToken: string;
  };
  user: {
    id: boolean;
    name: string;
    email: string;
  };
}
