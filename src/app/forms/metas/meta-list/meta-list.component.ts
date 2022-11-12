import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { MetaModel } from 'src/app/models/metaModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MetaService } from '../metas.service';

@Component({
  selector: 'app-meta-list',
  templateUrl: './meta-list.component.html',
  styleUrls: ['./meta-list.component.scss'],
})
export class MetaListComponent implements OnInit {
  data$!: Observable<any>;
  itemSelecionado!: any;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'apagar.svg',
      title: 'Excluir Meta',
    },
  ];

  displayedColumns = [
    { head: 'Nome', el: 'nome' },
    { head: 'Descricao', el: 'descricao' },
    { head: 'Valor Total', el: 'valorTotal' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private service: MetaService,
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

    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<MetaModel>[]) =>
          changes.map((c: DocumentChangeAction<MetaModel>) => ({
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
    this.router.navigate(['metas/' + $event.id]);
  }

  executarAcao(acaoPropagate: any) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case 'add-new':
        this.router.navigate(['metas/0']);
        break;
      case 'excluir':
        this.excluirItem(this.itemSelecionado.id);
    }
  }

  @MustConfirm('Mensagem de Confirmação antes de exclusão')
  excluirItem(identifier: string) {
    this.service.delete(identifier).then(() => {
      this.notificationService.showSucess('Registro deletado com Sucesso');
      this.loadData();
    });
  }
}
