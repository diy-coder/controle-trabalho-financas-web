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
    title: 'Inicio',
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
    title: 'metas',
    icon: 'account_balance',
    class: '',
    subItems: [],
    descricao: 'Lista de Metas',
  },
  /**
  {
    id: "curva-abc",
    path: "/analise-qualitativa",
    title: "Analise Qualitativa",
    icon: "leaderboard",
    class: "",
    subItems: [
      {
        path: "/curva-abc-clientes",
        title: "Curva ABC de Cliente",
        icon: "analytics",
        class: "",
        descricao: "Curva ABC de Clientes",
      },
      {
        path: "/curva-abc-produtos",
        title: "Curva ABC de Produtos",
        icon: "analytics",
        class: "",
        descricao: "Curva ABC de Produtos",
      },
      {
        path: "/curva-abc-faturamento",
        title: "Faturamento",
        icon: "analytics",
        class: "",
        descricao: "Faturamento",
      },
    ],
    descricao: "",
  },*/
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

  setEmpresaAtiva(empresa: any) {}

  logout() {
    this.userService.logout();
  }
}
