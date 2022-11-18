import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { FluxoTrabalhoStatusEnum } from 'src/app/enums/status-fluxo-trabalho.enum';
import { ClienteModel } from 'src/app/models/clienteModel';
import { FluxoDeTrabalhoModel } from 'src/app/models/fluxoDeTrabalhoModel';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ClienteService } from '../../clientes/clientes.service';
import { ProjetoService } from '../../projetos/projetos.service';
import { FluxoDeTrabalhoService } from '../fluxo-de-trabalho.service';

@Component({
  selector: 'app-fluxo-de-trabalho-cadastro',
  templateUrl: './fluxo-de-trabalho-cadastro.component.html',
  styleUrls: ['./fluxo-de-trabalho-cadastro.component.scss'],
})
export class FluxoDeTrabalhoCadastroComponent implements OnInit {
  fluxoFormGroup!: FormGroup;
  statusFluxoTrabalhoEnum: any = FluxoTrabalhoStatusEnum;
  identifier!: string | null;

  projetoList$!: Observable<any>;
  clienteList$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: FluxoDeTrabalhoService,
    private notificationService: NotificationService,
    private projetoService: ProjetoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);

    this.projetoList$ = this.projetoService.getAll();

    this.clienteService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<ClienteModel>[]) =>
          changes.map((c: DocumentChangeAction<ClienteModel>) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.clienteList$ = of(data);
      });
  }

  loadData(identifier: string | null) {
    if (this.identifier && this.identifier != '0') {
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data) => {
          const formData = data.payload.data();
          if (formData) {
            this.fluxoFormGroup.patchValue(formData);
          }
        });
    }
  }

  backToList() {
    this.router.navigate(['fluxo-de-trabalho']);
  }

  saveEntry() {
    const fluxoDeTrabalhoModelData = this.fluxoFormGroup.getRawValue();
    if (
      !this.identifier ||
      this.identifier == 'undefined' ||
      this.identifier == '0'
    ) {
      this.save(fluxoDeTrabalhoModelData);
    } else {
      this.update('' + this.identifier, fluxoDeTrabalhoModelData);
    }
  }

  save(fluxoDeTrabalhoModel: FluxoDeTrabalhoModel) {
    this.service.save(fluxoDeTrabalhoModel).then((data) => {
      this.notificationService.showSucess('Registro Criado com Sucesso');
      this.backToList();
    });
  }

  update(identifier: string, fluxoDeTrabalhoModel: FluxoDeTrabalhoModel) {
    this.service.update(identifier, fluxoDeTrabalhoModel).then((data) => {
      this.notificationService.showSucess('Registro Atualizado com Sucesso');
    });
  }

  changeEmailResponsavel(email: string) {
    this.fluxoFormGroup.patchValue({ emailResponsavel: email });
  }

  changeProject(project: any) {
    this.fluxoFormGroup.patchValue({
      dataInicioPrevista: project.inicioPrevisto,
      dataEntregaPrevista: project.terminoPrevisto,
      moeda: project.moeda,
      dificuldade: project.dificuldade,
    });
  }

  private construirFormulario() {
    this.fluxoFormGroup = this.formBuilder.group({
      user_creation: [],
      cliente: ['', Validators.required],
      projeto: ['', Validators.required],
      emailResponsavel: [{ value: '', disabled: true }],
      dataInicioPrevista: [{ value: '', disabled: true }],
      dataEntregaPrevista: [{ value: '', disabled: true }],
      dataInicioEfetiva: [],
      dataEntregaEfetiva: [],
      moeda: [{ value: '', disabled: true }],
      dificuldade: [{ value: '', disabled: true }],
      status: [],
      referencia: [],
      valor: [],
      gastos: [],
      pagamentoRecebido: [],
      dataPagamento: [],
      totalRecebido: [],
      observacoes: [],
    });
  }
}
