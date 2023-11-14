import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable()
export class AuthApiService extends ApiService {
  register(email: string, name: string, password: string) {
    return this.post<{ token: string }>(`/auth/register`, {email, name, password});
  }

  login(email: string, password: string) {
    return this.post<{ token: string }>(`/auth/login`, {email, password});
  }
}
