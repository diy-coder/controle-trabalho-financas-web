import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

declare const $: any;
declare interface RouteInfo {
  id: any;
  path: string;
  title: string;
  icon: string;
  class: string;
  subItems: Object;
  descricao: string;
}
export const ROUTES: RouteInfo[] = [
  {
    id: null,
    path: '/home',
    title: 'Dashboard',
    icon: 'dashboard',
    class: '',
    subItems: [],
    descricao: 'Início',
  },
  {
    id: null,
    path: '/clientes',
    title: 'Clientes',
    icon: 'person',
    class: '',
    subItems: [],
    descricao: 'Lista de Clientes',
  },
  {
    id: null,
    path: '/projetos',
    title: 'Projetos',
    icon: 'design_services',
    class: '',
    subItems: [],
    descricao: 'Lista de Projetos',
  },
  {
    id: null,
    path: '/metas',
    title: 'Metas',
    icon: 'account_balance',
    class: '',
    subItems: [],
    descricao: 'Lista de Metas',
  },

  {
    id: null,
    path: '/fluxo-de-trabalho',
    title: 'Fluxo de Trabalho',
    icon: 'business_center',
    class: '',
    subItems: [],
    descricao: 'Visualizar Fluxo de Trabalho',
  },

  {
    id: 'fluxo-de-caixa',
    path: '',
    title: 'Fluxo de Caixa',
    icon: 'attach_money',
    class: '',
    subItems: [
      {
        path: '/fluxo-de-caixa-cadastro',
        title: 'Gerenciar Fluxo',
        icon: 'drive_file_rename_outline',
        class: '',
        descricao: 'Cadastro de Entrada/Saída',
      },
      {
        path: '/fluxo-de-caixa-listagem',
        title: 'Visualizar Fluxo',
        icon: 'query_stats',
        class: '',
        descricao: 'Visualizar Fluxo de Caixa',
      },
    ],
    descricao: '',
  },

  {
    id: 'time-tracker',
    path: '',
    title: 'Time Tracker',
    icon: 'today',
    class: '',
    subItems: [
      {
        path: '/time-tracker-cadastro',
        title: 'Gerenciar Time Tracker',
        icon: 'more_time',
        class: '',
        descricao: 'Registro de Tempo Trabalhado',
      },
      {
        path: '/time-tracker-listagem',
        title: 'Visualizar Time Tracker',
        icon: 'view_timeline',
        class: '',
        descricao: 'Visualizar Tempo Trabalhado',
      },
    ],
    descricao: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];
  emitenteData$!: Observable<any>;
  selectedCNPJ = null;
  isUserAdmin = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.isUserAdmin = true;
    this.loadData();
  }

  loadData() {}

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.userService.logout();
  }
}
