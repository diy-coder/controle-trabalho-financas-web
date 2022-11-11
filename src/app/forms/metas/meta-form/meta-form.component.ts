import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { TipoMetaEnum } from 'src/app/enums/tipo-meta.enum.ts';
import { MetaItemModel, MetaModel } from 'src/app/models/metaModel';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MetaService } from '../metas.service';

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss'],
})
export class MetaFormComponent implements OnInit {
  @ViewChild('metaItemsForm') metaItemsForm!: NgForm;

  metaFormGroup!: FormGroup;
  metaItemsFormGroup!: FormGroup;
  identifier!: string | null;
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
    private service: MetaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);
  }

  loadData(identifier: string | null) {
    if (this.identifier && this.identifier != '0') {
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data) => {
          const formData = data.payload.data();
          if (formData) {
            if (formData.prazo) {
              formData.prazo = (
                formData.prazo as unknown as firebase.default.firestore.Timestamp
              ).toDate();
            }
            if (formData.items) {
              this.metaItemList = formData.items;
            }
            this.metaFormGroup.patchValue(formData);
          }
        });
    }
  }

  backToList() {
    this.router.navigate(['metas']);
  }

  saveEntry() {
    const metaModelData = this.metaFormGroup.getRawValue();
    metaModelData.items = this.metaItemList;
    if (
      !this.identifier ||
      this.identifier == 'undefined' ||
      this.identifier == '0'
    ) {
      this.save(metaModelData);
    } else {
      this.update('' + this.identifier, metaModelData);
    }
  }

  save(metaModel: MetaModel) {
    this.service.save(metaModel).then((data) => {
      this.notificationService.showSucess('Registro Criado com Sucesso');
      this.backToList();
    });
  }

  update(identifier: string, metaModel: MetaModel) {
    this.service.update(identifier, metaModel).then((data) => {
      this.notificationService.showSucess('Registro Atualizado com Sucesso');
    });
  }

  private construirFormulario() {
    this.metaFormGroup = this.formBuilder.group({
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
