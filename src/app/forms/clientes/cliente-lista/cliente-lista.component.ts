import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { ClienteModel } from 'src/app/models/clienteModel';
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
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);
    
    this.clienteService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<ClienteModel>[]) =>
          changes.map((c: DocumentChangeAction<ClienteModel>) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
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
