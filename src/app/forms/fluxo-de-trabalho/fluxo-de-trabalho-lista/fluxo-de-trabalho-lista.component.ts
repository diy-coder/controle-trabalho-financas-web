import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { FluxoDeTrabalhoModel } from 'src/app/models/fluxoDeTrabalhoModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FluxoDeTrabalhoService } from '../fluxo-de-trabalho.service';

@Component({
  selector: 'app-fluxo-de-trabalho-lista',
  templateUrl: './fluxo-de-trabalho-lista.component.html',
  styleUrls: ['./fluxo-de-trabalho-lista.component.scss'],
})
export class FluxoDeTrabalhoListaComponent implements OnInit {
  data$!: Observable<any>;
  itemSelecionado!: any;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'apagar.svg',
      title: 'Excluir Fluxo de Trabalho',
    },
  ];

  displayedColumns = [
    { head: 'Referência', el: 'referencia' },
    { head: 'Cliente', el: 'cliente' },
    { head: 'Projeto', el: 'projeto' },
    { head: 'Email Responsável', el: 'emailResponsavel' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private service: FluxoDeTrabalhoService,
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
        map((changes: DocumentChangeAction<FluxoDeTrabalhoModel>[]) =>
          changes.map((c: DocumentChangeAction<FluxoDeTrabalhoModel>) => ({
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
    this.router.navigate(['fluxo-de-trabalho/' + $event.id]);
  }

  executarAcao(acaoPropagate: any) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case 'add-new':
        this.router.navigate(['fluxo-de-trabalho/0']);
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
