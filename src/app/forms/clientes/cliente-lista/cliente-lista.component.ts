import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
})
export class ClienteListaComponent implements OnInit {
  data$!: Observable<any>;
  itemSelecionado!: any;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'apagar.svg',
      title: 'Excluir Cliente',
    },
  ];

  displayedColumns = [
    { head: 'Cliente', el: 'cliente' },
    { head: 'País', el: 'local' },
    { head: 'Email Responsável', el: 'emailResponsavel' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);
    this.loadData();
  }

  loadData() {
    this.clienteService.getAll().subscribe((data) => {
      this.data$ = of(data);
      this.loadingService.setLoading(false);
    });
  }

  onRowSelect($event: any) {
    if (!$event) {
      return;
    }
    this.router.navigate(['clientes/' + $event.id]);
  }

  executarAcao(acaoPropagate: any) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case 'add-new':
        this.router.navigate(['clientes/0']);
        break;
      case 'excluir':
        this.excluirItem(this.itemSelecionado.id);
    }
  }

  @MustConfirm('Mensagem de Confirmação antes de exclusão')
  excluirItem(identifier: string) {
    this.clienteService.delete(identifier).then(() => {
      this.notificationService.showSucess('Registro deletado com Sucesso');
      this.loadData();
    });
  }
}
