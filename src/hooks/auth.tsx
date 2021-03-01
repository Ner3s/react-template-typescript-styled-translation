import React, { createContext, useCallback, useContext, useState } from 'react';

import { toast } from 'react-toastify';

import api from '~/services/api';
import * as AuthService from '~/services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  cell_phone: string;
  date_of_birth: string;
  role: string;
  profile_image_path: string;
  balance: number;
  code: string;
  created_at: string;
  updated_at: string;
  status: boolean;
  status_ebook: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  loading: boolean;
  user: User;
  toggleToRememberMe(): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const existUserInLocalStorage = localStorage.getItem(
      '@AppName:token',
    );

    let token = null;
    let user = null;

    if (existUserInLocalStorage) {
      token = localStorage.getItem('@AppName:token');
      user = localStorage.getItem('@AppName:user');
    } else {
      token = sessionStorage.getItem('@AppName:token');
      user = sessionStorage.getItem('@AppName:user');
    }

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) }; // Transforma uma string em um objeto.
    }

    return {} as AuthState;
  });

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleToRememberMe = useCallback(() => {
    setRememberMe((prevState) => !prevState);
    localStorage.setItem(
      '@AppName:rememberMe',
      JSON.stringify(!rememberMe),
    );
  }, [rememberMe]);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      setLoading((prevState) => !prevState);

      const response = await AuthService.signIn({ email, password });

      const user = response.data;
      const { token } = response.session;

      const remember = localStorage.getItem('@AppName:rememberMe');

      if (remember) {
        localStorage.setItem('@AppName:token', token);
        localStorage.setItem('@AppName:user', JSON.stringify(user)); // O user eh um objeto, preciso converter em uma string
      } else if (!remember || remember === null) {
        sessionStorage.setItem('@AppName:token', token);
        sessionStorage.setItem('@AppName:user', JSON.stringify(user)); // O user eh um objeto, preciso converter em uma string
      }

      api.defaults.headers.authorization = `Bearer ${token}`;

      toast.success('Autenticação realizada com sucesso!');

      setData({ token, user });
    } catch (error) {
      console.log(error);

      toast.error('Falha na autenticação, verifique seus dados');

      setLoading((prevState) => !prevState);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AppName:token');
    localStorage.removeItem('@AppName:user');
    localStorage.removeItem('@AppName:rememberMe');

    setData({} as AuthState);
    setLoading(false);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      localStorage.setItem('@AppName:user', JSON.stringify(user)); // E precisa atualizar essa informacoes do avatar no localStorage tambem, se nao o react vai buscar por uma {user.avatar_url} que nao existe na img na pagina profile

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        loading,
        user: data.user,
        toggleToRememberMe,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
