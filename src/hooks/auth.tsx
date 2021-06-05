import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
} from 'react';

import * as dateFns from 'date-fns';

import { ICredentials } from '~/models/Auth';
import { IUser } from '~/models/User';
import api from '~/services/api';
import SessionService from '~/services/Session';

interface AuthContextData {
  user: IUser;
  isAuthenticated: boolean;
  signin(credentials: ICredentials): Promise<void>;
  logout(): void;
}

interface AuthProps {
  children: ReactNode;
}

interface AuthState {
  token: string;
  user: IUser;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProps): ReactElement {
  const PREFIX = '@Maosaobra';

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${PREFIX}:token`);
    const userString = localStorage.getItem(`${PREFIX}:user`);
    const expires_at = localStorage.getItem(`${PREFIX}:token.expires_at`);

    if (expires_at) {
      // Verify if exists
      const convertedDate: Date = new Date(expires_at); // Convert expires_at in date format
      const validateDate = dateFns.addDays(convertedDate, 2); // Add 2 days after day in expires_at

      convertedDate >= validateDate && logout();
    }

    if (token && userString) {
      const user: IUser = JSON.parse(userString); // convert string in user object
      api.defaults.headers.Authorizations = `Bearer ${token}`; // Add token in header request

      return { user, token };
    }

    return {} as AuthState;
  });

  const signin = async ({
    email,
    password,
    remember_me,
  }: ICredentials): Promise<void> => {
    const user = data;
    if (user) logout();

    try {
      const response = await SessionService.signin({
        email,
        password,
      });

      localStorage.setItem(`${PREFIX}:token`, response.data.auth.token);

      if (!remember_me) {
        localStorage.setItem(`${PREFIX}:token.expires_at`, String(new Date()));
      }

      localStorage.setItem(
        `${PREFIX}:user`,
        JSON.stringify(response.data.data),
      );

      setData({
        user: response.data.data,
        token: response.data.auth.token,
      });
    } catch (error) {
      throw new Error(
        error?.response?.data?.error?.message
          ? error?.response?.data?.error?.message
          : 'Verifique os campos',
      );
    }
  };

  const logout = (): void => {
    ['token', 'user', 'token.expires_at'].forEach((key) => {
      localStorage.removeItem(`${PREFIX}:${key}`);
    });

    setData({} as AuthState);
    api.defaults.headers.Authorization = '';
  };

  return (
    <AuthContext.Provider
      value={{ user: data.user, isAuthenticated: !!data.user, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
