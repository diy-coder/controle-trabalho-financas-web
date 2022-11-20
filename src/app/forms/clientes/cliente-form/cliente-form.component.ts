import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusClienteEnum } from 'src/app/enums/status-cliente.enum';
import { TipoCobrancaEnum } from 'src/app/enums/tipo-cobranca.enum';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormCrudOpts } from '../../forms-super';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent extends FormCrudOpts implements OnInit {
  statusClienteEnum: any = StatusClienteEnum;
  tipoCobrancaEnum: any = TipoCobrancaEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    notificationService: NotificationService,
    loadingService: LoadingService
  ) {
    super(clienteService, notificationService, loadingService);
  }

  ngOnInit(): void {
    const identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(identifier);
  }

  loadData(identifier: any) {
    if (identifier != "0") {
      this.startLoading()
      this.clienteService.getById('' + identifier).subscribe((formData) => {

        if (formData) {
          this.formGroup.patchValue(formData);
        }
        this.stoptLoading()
      });
    }
  }

  backToList() {
    this.router.navigate(['clientes']);
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [0],
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
      moeda: [''],
    });
  }
}
