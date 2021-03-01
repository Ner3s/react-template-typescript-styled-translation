export interface IUser {
  email: string;
  senha: string;
}

export interface User {
  session: {
    type: string;
    token: string;
    refreshToken: string;
  };
  data: {
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
  };
}
