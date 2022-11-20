import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FluxoTrabalhoStatusEnum } from 'src/app/enums/status-fluxo-trabalho.enum';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ClienteService } from '../../clientes/clientes.service';
import { FluxoDeCaixaService } from '../../fluxo-de-caixa/fluxo-de-caixa.service';
import { FormCrudOpts } from '../../forms-super';
import { ProjetoService } from '../../projetos/projetos.service';
import { TimeTrackerService } from '../../time-tracker/time-tracker.service';
import { FluxoDeTrabalhoService } from '../fluxo-de-trabalho.service';

@Component({
  selector: 'app-fluxo-de-trabalho-cadastro',
  templateUrl: './fluxo-de-trabalho-cadastro.component.html',
  styleUrls: ['./fluxo-de-trabalho-cadastro.component.scss'],
})
export class FluxoDeTrabalhoCadastroComponent
  extends FormCrudOpts
  implements OnInit
{
  statusFluxoTrabalhoEnum: any = FluxoTrabalhoStatusEnum;
  identifier: any;

  projetoList$!: Observable<any>;
  timeTrackerList$!: Observable<any>;
  fluxoDeCaixaList$!: Observable<any>;
  clienteList$!: Observable<any>;

  displayedColumnsTimeTracker = [
    { head: 'Projeto', el: 'projeto' },
    { head: 'Data Início', el: 'dataInicio', format: { tipo: 'TIMESTAMP' } },
    { head: 'Data Término', el: 'dataTermino', format: { tipo: 'TIMESTAMP' } },
    { head: 'Tempo Gasto', el: 'timeSpent' },
  ];

  displayedColumnsFluxoCaixa = [
    { head: 'Data', el: 'data', format: { tipo: 'DATE' } },
    { head: 'Descrição', el: 'descricao' },
    { head: 'Tipo de Operação', el: 'tipoOperacao' },
    {
      head: 'valor',
      el: 'valor',
      format: { tipo: 'PIPE', pipe: 'currency', arguments: 'BRL' },
    },
    { head: 'Projeto', el: 'projeto' },
  ];

  constructor(
    service: FluxoDeTrabalhoService,
    notificationService: NotificationService,
    loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projetoService: ProjetoService,
    private clienteService: ClienteService,
    private timeTrackerService: TimeTrackerService,
    private fluxoDeCaixaService: FluxoDeCaixaService
  ) {
    super(service, notificationService, loadingService);
  }

  ngOnInit(): void {
    this.identifier = this.route.snapshot.paramMap.get('identifier');
    this.construirFormulario();
    this.loadData(this.identifier);
  }

  loadData(identifier: string | null) {
    this.projetoList$ = this.projetoService.getAll();

    this.clienteService.getAll().subscribe((data) => {
      this.clienteList$ = of(data);
    });

    if (identifier && identifier != '0') {
      this.startLoading()
      this.service
        .getById('' + identifier)
        .snapshotChanges()
        .subscribe((data: any) => {
          const formData = data.payload.data();
          formData.id = data.payload.id;
          if (formData) {
            this.formGroup.patchValue(formData);
            this.loadTimeTracker(formData.projeto);
            this.loadFluxoDeCaixa(formData.projeto)
          }
          this.stoptLoading()
        });
    }
  }

  loadTimeTracker(projeto: string) {
    this.timeTrackerService.getAll().subscribe((data) => {
      const filteredData = data.filter((item: any) => item.projeto == projeto);

      this.timeTrackerList$ = of(
        filteredData.sort(
          (a: any, b: any) => b.dataInicio?.getTime() - a.dataInicio?.getTime()
        )
      );
    });
  }

  loadFluxoDeCaixa(projeto: string) {
    this.fluxoDeCaixaService.getAll().subscribe((data) => {
      const filteredData = data.filter((item: any) => item.projeto == projeto);

      this.fluxoDeCaixaList$ = of(
        filteredData.sort(
          (a: any, b: any) => b.dataInicio?.getTime() - a.dataInicio?.getTime()
        )
      );
    });
  }

  backToList() {
    this.router.navigate(['fluxo-de-trabalho']);
  }

  changeEmailResponsavel(email: string) {
    this.formGroup.patchValue({ emailResponsavel: email });
  }

  changeProject(project: any) {
    this.formGroup.patchValue({
      dataInicioPrevista: project.inicioPrevisto,
      dataEntregaPrevista: project.terminoPrevisto,
      moeda: project.moeda,
      dificuldade: project.dificuldade,
    });
  }

  private construirFormulario() {
    this.formGroup = this.formBuilder.group({
      id: [0],
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
      linkArmazenamentoNuvem: [],
    });
  }
}
