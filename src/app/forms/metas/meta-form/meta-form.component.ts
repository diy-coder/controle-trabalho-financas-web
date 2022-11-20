import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { TipoMetaEnum } from 'src/app/enums/tipo-meta.enum.ts';
import { MetaItemModel } from 'src/app/models/metaModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';
import { FormCrudOpts } from '../../forms-super';
import { MetaService } from '../metas.service';

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss'],
})
export class MetaFormComponent extends FormCrudOpts implements OnInit {
  @ViewChild('metaItemsForm') metaItemsForm!: NgForm;

  metaItemsFormGroup!: FormGroup;
  tipoMetaEnum = TipoMetaEnum;
  metaItemList: MetaItemModel[] = [];

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      icone: 'apagar.svg',
      title: 'Excluir Turma',
    },
  ];

  displayedColumns = [
    { head: 'Produto', el: 'produto' },
    { head: 'Valor Unit.', el: 'valorUnitario' },
    { head: 'Quantidade', el: 'quantidade' },
    { head: 'Valor Total', el: 'valorTotal' },
    { head: 'Tipo de Meta', el: 'tipoMeta' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    service: MetaService,
    notificationService: NotificationService,
    loadingService: LoadingService
  ) {
    super(service, notificationService, loadingService);
  }

  ngOnInit(): void {
    const identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(identifier);
  }

  loadData(identifier: string | null) {
    if (identifier && identifier != '0') {
      this.startLoading()
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data: any) => {
          const formData = data.payload.data();
          formData.id = data.payload.id;
          if (formData) {
            formData.prazo = DateTimeUtils.firebaseDateToDate(formData.prazo);
            if (formData.items) {
              this.metaItemList = formData.items;
            }
            this.formGroup.patchValue(formData);
          }
          this.stoptLoading()
        });
    }
  }

  backToList() {
    this.router.navigate(['metas']);
  }

  override preSaveAction() {
    this.formGroup.patchValue({ items: this.metaItemList });
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      user_creation: [],
      nome: ['', Validators.required],
      descricao: [],
      prazo: [],
      valorTotal: [],
      items: [],
    });

    this.metaItemsFormGroup = this.formBuilder.group({
      produto: ['', Validators.required],
      valorUnitario: [],
      quantidade: [],
      valorTotal: [],
      tipoMeta: [],
    });
  }

  executarAcao(acaoPropagate: any) {
    switch (acaoPropagate.acao) {
      case 'excluir':
        this.excluirItem(acaoPropagate.item);
    }
  }

  @MustConfirm('Mensagem de Confirmação antes de exclusão')
  excluirItem(item: any) {
    const index = this.metaItemList.indexOf(item);
    if (index !== -1) {
      this.metaItemList.splice(index, 1);
    }
    this.metaItemList = [...this.metaItemList];
  }

  addMetaItem() {
    const metaItemData = this.metaItemsFormGroup.getRawValue();
    this.metaItemList.push(metaItemData);
    this.metaItemList = [...this.metaItemList];
    this.metaItemsForm.resetForm();
  }
}
