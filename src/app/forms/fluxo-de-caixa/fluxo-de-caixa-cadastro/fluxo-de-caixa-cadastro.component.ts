import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { TipoOperacaoEnum } from 'src/app/enums/tipo-operacao.enum';
import { FluxoDeCaixaModel } from 'src/app/models/fluxoDeCaixaModel';
import { ProjetoModel } from 'src/app/models/projetoModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ProjetoService } from '../../projetos/projetos.service';
import { FluxoDeCaixaService } from '../fluxo-de-caixa.service';

@Component({
  selector: 'app-fluxo-de-caixa-cadastro',
  templateUrl: './fluxo-de-caixa-cadastro.component.html',
  styleUrls: ['./fluxo-de-caixa-cadastro.component.scss'],
})
export class FluxoDeCaixaCadastroComponent implements OnInit {
  @ViewChild('fluxoDeCaixaForm') fluxoDeCaixaForm!: NgForm;

  fluxoDeCaixaFormGroup!: FormGroup;
  projetoList$!: Observable<string[]>;
  tipoOperacaoEnum = TipoOperacaoEnum;

  data$!: Observable<any>;
  itemSelecionado!: any;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'delete-36.svg',
      title: 'Excluir Fluxo',
    },
    {
      nome: 'editar',
      acao: 'editar',
      icone: 'edit-36.svg',
      title: 'Editar Fluxo',
    },
  ];

  displayedColumns = [
    { head: 'Data', el: 'data', format: { tipo: 'DATE' } },
    { head: 'Descrição', el: 'descricao' },
    { head: 'Tipo de Operação', el: 'tipoOperacao' },
    {
      head: 'valor',
      el: 'valor',
      format: { tipo: 'PIPE', pipe: 'currency', arguments: 'BRL' },
    },
    { head: 'Projeto', el: 'projeto' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: FluxoDeCaixaService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private projetoService: ProjetoService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);

    this.projetoService.getAll().subscribe((data: ProjetoModel[]) => {
      const projetos = data.map((projeto) => projeto.nome);
      this.projetoList$ = of(projetos);
    });

    this.service.getAll().subscribe((data) => {
      this.data$ = of(
        data.sort((a: any, b: any) => b.data?.getTime() - a.data?.getTime())
      );
      this.loadingService.setLoading(false);
    });
  }

  saveEntry() {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);

    const fluxoDeCaixaModelData = this.fluxoDeCaixaFormGroup.getRawValue();
    if (!fluxoDeCaixaModelData.id) {
      this.save(fluxoDeCaixaModelData);
    } else {
      this.update('' + fluxoDeCaixaModelData.identifier, fluxoDeCaixaModelData);
    }
  }

  save(fluxoDeCaixaModel: FluxoDeCaixaModel) {
    this.service.save(fluxoDeCaixaModel).then((data) => {
      this.notificationService.showSucess('Registro Criado com Sucesso');
      this.fluxoDeCaixaForm.resetForm();
      this.loadData();
    });
  }

  update(identifier: string, fluxoDeCaixaModel: FluxoDeCaixaModel) {
    this.service.update(identifier, fluxoDeCaixaModel).then((data) => {
      this.notificationService.showSucess('Registro Atualizado com Sucesso');
      this.fluxoDeCaixaForm.resetForm();
      this.loadData();
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
      case 'editar':
        this.fluxoDeCaixaFormGroup.patchValue(acaoPropagate.item);
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

  cancel() {
    this.fluxoDeCaixaForm.resetForm();
  }

  private construirFormulario() {
    this.fluxoDeCaixaFormGroup = this.formBuilder.group({
      id: [],
      user_creation: [],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      tipoOperacao: ['', Validators.required],
      valor: ['', Validators.required],
      projeto: [],
    });
  }
}
