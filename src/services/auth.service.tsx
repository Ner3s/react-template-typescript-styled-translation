import { AxiosResponse } from 'axios';

import { IUser, User } from '~/models/User';

import api from './api';

interface IAuthProps {
  email: string;
  password: string;
}

/**
 * Function to sign in user
 * @param {string} email Email of user
 * @param {string} password Password of user.
 *
 * @return Info about user logged.
 */

export async function signIn({ email, password }: IAuthProps): Promise<User> {
  const response: AxiosResponse<User> = await api.post('/session', {
    email,
    password,
  });

  return response.data;
}

export async function signUp({ email, password }: IAuthProps): Promise<User> {
  const response: AxiosResponse<User> = await api.post('/session/signup', {
    email,
    password
  });

  return response.data;
}
