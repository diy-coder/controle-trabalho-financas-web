import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, of } from 'rxjs';
import { auth } from 'src/app/app.module';
import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenService.hasToken();
    this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if (token) {
      const user = jwt_decode.default(token) as User;
      this.userSubject.next(user);
    } else {
      this.logout();
    }
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('isNewUser');
    this.userSubject.next(null);
    this.firebaseAuth.signOut();

    this.stopRefreshTokenTimer();
    this.router.navigate(['/sign-in']);
  }

  public isLogged() {
    return this.tokenService.hasToken();
  }

  private refreshTokenTimeout: string | number | NodeJS.Timeout | undefined;

  public startRefreshTokenTimer() {
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      1 * 1000 * 60 * 10 // 10 minutos
    );
  }

  refreshToken() {
    const user = auth.currentUser;

    if (user) {
      user.getIdToken(true).then((token) => {
        this.tokenService.setToken(token);
      });
    }

    this.startRefreshTokenTimer();

    return of('token atualizado com sucesso');
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
