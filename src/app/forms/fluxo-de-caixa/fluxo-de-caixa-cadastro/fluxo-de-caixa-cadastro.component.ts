import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
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
  identifier!: string | null;
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
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: FluxoDeCaixaService,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private projetoService: ProjetoService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);

    this.projetoService
      .getAll()
      .valueChanges()
      .subscribe((data: ProjetoModel[]) => {
        const projetos = data.map((projeto) => projeto.nome);
        this.projetoList$ = of(projetos);
      });

    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<FluxoDeCaixaModel>[]) =>
          changes.map((c: DocumentChangeAction<FluxoDeCaixaModel>) => ({
            id: c.payload.doc.id,
            user_creation: c.payload.doc.data().user_creation, 
            descricao: c.payload.doc.data().descricao,
            tipoOperacao: c.payload.doc.data().tipoOperacao,
            valor: c.payload.doc.data().valor,
            projeto: c.payload.doc.data().projeto,
            data: c.payload.doc.data()
              ? (
                  c.payload.doc.data()
                    .data as unknown as firebase.default.firestore.Timestamp
                ).toDate()
              : null,
            style: c.payload.doc.data().tipoOperacao,
          }))
        )
      )
      .subscribe((data) => {
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
    if (
      !this.identifier ||
      this.identifier == 'undefined' ||
      this.identifier == '0'
    ) {
      this.save(fluxoDeCaixaModelData);
    } else {
      this.update('' + this.identifier, fluxoDeCaixaModelData);
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
        this.identifier = acaoPropagate.item.id;
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
      user_creation: [],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      tipoOperacao: ['', Validators.required],
      valor: ['', Validators.required],
      projeto: [],
    });
  }
}
