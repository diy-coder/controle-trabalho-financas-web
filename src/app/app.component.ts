import { Component } from '@angular/core';
import { UserService } from './core/user/user.service';
import { LoadingService } from './services/loading-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'controle-trabalho-financas';

  constructor(readonly userService: UserService, public loadingService: LoadingService) {}
}
