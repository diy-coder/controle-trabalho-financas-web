import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';

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
      title: 'Excluir Turma',
    },
  ];

  displayedColumns = [
    { head: 'Id', el: 'id' },
    { head: 'Name', el: 'name' },
    { head: 'Description', el: 'description' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data$ = of([
      {
        id: 1,
        name: 'Arnold',
        description: 'Backend developer at Mindera',
      },
    ]);
  }

  onRowSelect($event: any) {
    console.log($event);
    
    if (!$event) {
      return;
    }
    this.router.navigate(['clientes/' + $event.documentId]);
  }

  executarAcao(acaoPropagate: any) {
    this.itemSelecionado = acaoPropagate.item;
    switch (acaoPropagate.acao) {
      case 'add-new':
        this.router.navigate(['clientes/0']);
        break;
      case 'excluir':
        this.excluirItem();
    }
  }

  @MustConfirm('Mensagem de Confirmação antes de exclusão')
  excluirItem() {
    console.log('Item foi excluido');
  }
}
