import {
  IForgotPasswordResponse,
  IValidateCodeResponse,
  IResetPasswordResponse,
} from '~/models/Password';

import api from './api';

interface ForgotPasswordProps {
  email: string;
}

interface ValidateCodeProps {
  code: string;
  email: string;
}

interface ResetPasswordProps {
  resetedPassword_id: number;
  password: string;
}

/**
 * forgotPassword.
 *
 * Step 01 -
 * Send email and receive code in email.
 * @param {string} email Email of the user who is trying to recover the password.
 *
 * @return Receive code to use in Step 02 (ValidateCode).
 */

export async function forgotPassword({
  email,
}: ForgotPasswordProps): Promise<IForgotPasswordResponse> {
  const response = await api.post('/auth/forgotpassword', {
    email,
  });

  return response.data;
}

/**
 * validateCode.
 *
 * Step 02 -
 * Send email and code to received id to use in function resetPassword, to use in parameter resetedPassword_id.
 * @param {string} code Code received in Step 01.
 * @param {string} email Email of the user who is trying to recover the password.
 *
 * @return Receive code to use in Step 02 (ValidateCode).
 */

export async function validateCode({
  code,
  email,
}: ValidateCodeProps): Promise<IValidateCodeResponse> {
  const response = await api.post('/auth/validate/code', {
    code,
    email,
  });

  return response.data;
}

/**
 * resetPassword.
 *
 * Step 03 -
 * Send resetedPassword_id and new password to recover password.
 * @param {string} resetedPassword_id Id received in Step 02.
 * @param {string} password New password of user.
 *
 * @return Data about the user who recovered the password.
 */

export async function resetPassword({
  resetedPassword_id,
  password,
}: ResetPasswordProps): Promise<IResetPasswordResponse> {
  const response = await api.put('/auth/reset/password', {
    resetedPassword_id,
    password,
  });

  return response.data;
}
