import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
} from 'react';
import { ICredentials } from '~/models/Auth';
import { IUser } from '~/models/User';
import api from '~/services/api';
import SessionService from '~/services/Session';

interface AuthContextData {
  user: IUser;
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
  const PREFIX = '@AppName';

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(`${PREFIX}:token`);
    const userString = localStorage.getItem(`${PREFIX}:user`);

    if (token && userString) {
      const user: IUser = JSON.parse(userString);
      api.defaults.headers.Authorizations = `Bearer ${token}`;

      return { user, token };
    }

    return {} as AuthState;
  });

  const signin = async ({ email, password }: ICredentials): Promise<void> => {
    const user = data;
    if (user) logout();

    try {
      const response = await SessionService.signin({
        email,
        password,
      });

      localStorage.setItem(
        `${PREFIX}:token`,
        JSON.stringify(response.data.auth.token),
      );

      localStorage.setItem(
        `${PREFIX}:user`,
        JSON.stringify(response.data.data),
      );

      const json = {
        user: response.data.data,
        token: response.data.auth.token,
      };

      setData(json);
    } catch (error) {
      throw new Error(`${error.message ? error.message : error.error.message}`);
    }
  };

  const logout = (): void => {
    ['token', 'user'].forEach((key) => {
      localStorage.removeItem(`${PREFIX}:${key}`);
    });

    setData({} as AuthState);
    api.defaults.headers.Authorization = '';
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signin, logout }}>
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
