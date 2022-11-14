import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

const KEY = 'authToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  setRefreshToken(token: string) {
    window.localStorage.setItem(REFRESH_TOKEN, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode.default(token);
    }
    return '';
  }

  getRefreshToken() {
    return window.localStorage.getItem(REFRESH_TOKEN);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(REFRESH_TOKEN);
  }
}
