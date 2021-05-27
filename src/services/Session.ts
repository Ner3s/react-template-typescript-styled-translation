import { AxiosPromise } from 'axios';
import {
  ICredentials,
} from '../models/Auth';

import api from './api';

const SessionService = {
  signin(data: ICredentials): AxiosPromise<any> {
    return api.post('/auth/signin', data);
  },
}

export default SessionService;
