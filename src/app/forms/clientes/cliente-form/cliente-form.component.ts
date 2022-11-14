import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusClienteEnum } from 'src/app/enums/status-cliente.enum';
import { TipoCobrancaEnum } from 'src/app/enums/tipo-cobranca.enum';
import { ClienteModel } from 'src/app/models/clienteModel';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  clienteFormGroup!: FormGroup;
  statusClienteEnum: any = StatusClienteEnum;
  tipoCobrancaEnum: any = TipoCobrancaEnum;
  identifier!: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);
  }

  loadData(identifier: string | null) {
    if (this.identifier && this.identifier != '0') {
      this.clienteService
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data) => {
          const formData = data.payload.data();
          if (formData) {
            this.clienteFormGroup.patchValue(formData);
          }
        });
    }
  }

  backToList() {
    this.router.navigate(['clientes']);
  }

  saveEntry() {
    const clienteModelData = this.clienteFormGroup.getRawValue();
    if (
      !this.identifier ||
      this.identifier == 'undefined' ||
      this.identifier == '0'
    ) {
      this.save(clienteModelData);
    } else {
      this.update('' + this.identifier, clienteModelData);
    }
  }

  save(clienteModel: ClienteModel) {
    this.clienteService.save(clienteModel).then((data) => {
      this.notificationService.showSucess('Registro Criado com Sucesso');
      this.backToList();
    });
  }

  update(identifier: string, clienteModel: ClienteModel) {
    this.clienteService.update(identifier, clienteModel).then((data) => {
      this.notificationService.showSucess('Registro Atualizado com Sucesso');
    });
  }

  private construirFormulario() {
    this.clienteFormGroup = this.formBuilder.group({
      user_creation: [],
      cliente: ['', Validators.required],
      local: [''],
      emailResponsavel: ['', Validators.required],
      emailFinanceiro: [''],
      comoMeEncontrou: [''],
      quemIndicou: [''],
      status: [''],
      tipoCobranca: [''],
      ultimoValorCobrado: [''],
      totalRecebido: [''],
      projetosTotal: [''],
      ultimoProjetoInicio: [''],
      ultimoProjetoEntrega: [''],
      dataPrimeiroContato: [''],
    });
  }
}
