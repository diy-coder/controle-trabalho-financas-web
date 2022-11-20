import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoadIconAroundInvoke } from 'src/app/decorators/load-icon.decorator';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';
import { TipoOperacaoEnum } from 'src/app/enums/tipo-operacao.enum';
import { ProjetoModel } from 'src/app/models/projetoModel';
import { TimeTrackerModel } from 'src/app/models/timeTrackerModel';
import { LoadingService } from 'src/app/services/loading-service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ProjetoService } from '../../projetos/projetos.service';
import { TimeTrackerService } from '../time-tracker.service';

@Component({
  selector: 'app-time-tracker-cadastro',
  templateUrl: './time-tracker-cadastro.component.html',
  styleUrls: ['./time-tracker-cadastro.component.scss'],
})
export class TimeTrackerCadastroComponent implements OnInit {
  @ViewChild('fluxoDeCaixaForm') fluxoDeCaixaForm!: NgForm;

  fluxoDeCaixaFormGroup!: FormGroup;
  projetoList$!: Observable<string[]>;
  tipoOperacaoEnum = TipoOperacaoEnum;

  data$!: Observable<any>;

  botoes = [
    {
      nome: 'excluir',
      acao: 'excluir',
      title: 'Excluir Fluxo',
      estilo: 'btnElement',
      classe: 'btn-danger',
      classeDiv: 'mr-3',
      alwaysVisible: true,
    },
    {
      nome: 'editar',
      acao: 'editar',
      title: 'Editar Fluxo',
      estilo: 'btnElement',
      classeDiv: 'mr-3',
      alwaysVisible: true,
    },
    {
      nome: 'stopTracker',
      acao: 'stopTracker',
      title: 'Parar Tracker',
      estilo: 'btnElement',
      classe: 'btn-danger',
      condicao: 'isNotFinished',
    },
  ];

  displayedColumns = [
    { head: 'Projeto', el: 'projeto' },
    { head: 'Data Início', el: 'dataInicio', format: { tipo: 'TIMESTAMP' } },
    { head: 'Data Término', el: 'dataTermino', format: { tipo: 'TIMESTAMP' } },
    { head: 'Tempo Gasto', el: 'timeSpent' },
    { head: 'Ações', el: 'actions', botoes: this.botoes },
  ];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: TimeTrackerService,
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
        data.sort(
          (a: any, b: any) => b.dataInicio?.getTime() - a.dataInicio?.getTime()
        )
      );
      this.loadingService.setLoading(false);
    });
  }

  saveEntry() {
    const timeTrackerModelData = this.fluxoDeCaixaFormGroup.getRawValue();
    if (!timeTrackerModelData.id) {
      this.save(timeTrackerModelData);
    } else {
      this.update('' + timeTrackerModelData.id, timeTrackerModelData);
    }
  }

  @LoadIconAroundInvoke()
  async save(timeTrackerModel: TimeTrackerModel) {
    this.updateTimeSpent(timeTrackerModel);
    await this.service.save(timeTrackerModel);
    this.notificationService.showSucess('Registro Criado com Sucesso');
    this.fluxoDeCaixaForm.resetForm();
    this.loadData();
  }

  async stopTracker(identifier: string, timeTrackerModel: TimeTrackerModel) {
    timeTrackerModel.dataTermino = new Date();
    this.update(identifier, timeTrackerModel);
  }

  @LoadIconAroundInvoke()
  async update(identifier: string, timeTrackerModel: TimeTrackerModel) {
    this.updateTimeSpent(timeTrackerModel);
    await this.service.update(identifier, timeTrackerModel);
    this.notificationService.showSucess('Registro Atualizado com Sucesso');
    this.fluxoDeCaixaForm.resetForm();
    this.loadData();
  }

  executarAcao(acaoPropagate: any) {
    switch (acaoPropagate.acao) {
      case 'editar':
        this.fluxoDeCaixaFormGroup.patchValue(acaoPropagate.item);
        break;
      case 'excluir':
        this.excluirItem(acaoPropagate.item.id);
        break;
      case 'stopTracker':
        this.stopTracker(acaoPropagate.item.id, acaoPropagate.item);
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

  calculateDifferenceBetweenTwoDates(model: TimeTrackerModel) {
    if (!model.dataInicio || !model.dataTermino) {
      return '';
    }
    var diffMs = model.dataTermino.getTime() - model.dataInicio.getTime();
    var diffDays = Math.floor(diffMs / 86400000);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffDays + ' dias, ' + diffHrs + ' horas, ' + diffMins + ' minutos';
  }

  getDifferenceInMinutes(timeTrackerModel: TimeTrackerModel): number {
    const secs = Math.floor(
      Math.abs(
        timeTrackerModel.dataTermino.getTime() -
          timeTrackerModel.dataInicio.getTime()
      ) / 1000
    );
    return Math.floor(secs / 60);
  }

  private updateTimeSpent(timeTrackerModel: TimeTrackerModel) {
    if (timeTrackerModel.dataInicio && timeTrackerModel.dataTermino) {
      timeTrackerModel.minutesTotalSpent =
        this.getDifferenceInMinutes(timeTrackerModel);

      timeTrackerModel.timeSpent =
        this.calculateDifferenceBetweenTwoDates(timeTrackerModel);
    }
  }
  private construirFormulario() {
    this.fluxoDeCaixaFormGroup = this.formBuilder.group({
      id: [],
      user_creation: [],
      projeto: ['', Validators.required],
      dataInicio: [new Date(), Validators.required],
      dataTermino: [],
      timeSpent: [],
    });
  }
}
