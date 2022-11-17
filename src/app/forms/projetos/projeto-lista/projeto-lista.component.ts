import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { ProjetoModel } from 'src/app/models/projetoModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ProjetoService } from '../projetos.service';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto-lista.component.html',
  styleUrls: ['./projeto-lista.component.scss'],
})
export class ProjetoListaComponent implements OnInit {
  data$!: Observable<any>;
  itemSelecionado!: any;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'apagar.svg',
      title: 'Excluir Projeto',
    },
  ];

  displayedColumns = [
    { head: 'Cliente', el: 'cliente' },
    { head: 'Nome', el: 'nome' },
    { head: 'Descricao', el: 'descricao' },
    { head: 'Moeda', el: 'moeda' },
    {
      head: 'Valor Estimado',
      el: 'valorEstimado',
      format: { tipo: 'PIPE', pipe: 'decimal' },
    },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private service: ProjetoService,
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
        map((changes: DocumentChangeAction<ProjetoModel>[]) =>
          changes.map((c: DocumentChangeAction<ProjetoModel>) => ({
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
    this.router.navigate(['projetos/' + $event.id]);
  }

  executarAcao(acaoPropagate: any) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case 'add-new':
        this.router.navigate(['projetos/0']);
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
