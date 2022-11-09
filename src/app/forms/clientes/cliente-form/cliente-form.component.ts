import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusClienteEnum } from 'src/app/enums/status-cliente.enum';
import { ClienteService } from '../clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  clienteFormGroup!: FormGroup;
  statusClienteEnum: any = StatusClienteEnum;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    console.log(this.statusClienteEnum[0]);
    
    this.construirFormulario();
  }

  backToList() {
    this.router.navigate(['clientes']);
  }

  save() {
    const clienteModelData = this.clienteFormGroup.getRawValue();
    console.log(clienteModelData);

    this.clienteService.save(clienteModelData).then((data) => {
      console.log('Successfully created');
      console.log(data);
    });
  }

  private construirFormulario() {
    this.clienteFormGroup = this.formBuilder.group({
      cliente: [''],
      local: [''],
      emailResponsavel: [''],
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
