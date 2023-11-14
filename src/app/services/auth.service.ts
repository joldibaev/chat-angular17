import {Injectable} from '@angular/core';

const STORAGE_KEY: string = 'chat-token-31j2khad';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;

  constructor() {
  }

  isTokenExists() {
    const token = this.getToken();
    return Boolean(token?.length);
  }

  getToken() {
    if (!this.token) {
      const token = sessionStorage.getItem(STORAGE_KEY);
      if (token) {
        this.token = token;
      }
    }

    return this.token;
  }

  setToken(token: string) {
    this.token = token;

    sessionStorage.setItem(STORAGE_KEY, token);
  }

  logOut() {
    this.token = undefined;

    sessionStorage.removeItem(STORAGE_KEY);
  }
}
