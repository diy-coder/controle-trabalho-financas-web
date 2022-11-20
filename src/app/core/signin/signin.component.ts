import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/auth'; //v9
import * as firebaseui from 'firebaseui';
import { auth } from 'src/app/app.module';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.userService.isLogged()) {
      this.router.navigate(['home']);
    }

    var config = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult: {
          user: {
            getIdToken: () => Promise<any>;
            toJSON: () => {
              (): any;
              new (): any;
              stsTokenManager: { (): any; new (): any; refreshToken: any };
            };
          };
          additionalUserInfo: { isNewUser: string };
        }) => this.goHome(authResult),
      },
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
    };

    let ui: any;

    if (firebaseui.auth.AuthUI.getInstance()) {
      ui = firebaseui.auth.AuthUI.getInstance();
    } else {
      ui = new firebaseui.auth.AuthUI(auth);
    }

    ui.start('#firebaseui-auth-container', config);
  }

  goHome(authResult: any): boolean {
    authResult.user.getIdToken().then((token: any) => {
      this.userService.startRefreshTokenTimer();

      localStorage.setItem(
        'isNewUser',
        authResult.additionalUserInfo.isNewUser
      );
      this.tokenService.setToken(token);
      this.tokenService.setRefreshToken(
        authResult.user.toJSON().stsTokenManager.refreshToken
      );
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    });

    return false;
  }
}
