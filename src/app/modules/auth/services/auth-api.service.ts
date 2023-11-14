import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable()
export class AuthApiService extends ApiService {
  login(email: string, password: string) {
    return this.post<{ token: string }>(`/auth/login`, {email, password});
  }
}
