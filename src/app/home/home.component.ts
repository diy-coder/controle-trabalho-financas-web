import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { FluxoTrabalhoStatusEnum } from '../enums/status-fluxo-trabalho.enum';
import { FluxoDeTrabalhoService } from '../forms/fluxo-de-trabalho/fluxo-de-trabalho.service';
import { FluxoDeTrabalhoModel } from '../models/fluxoDeTrabalhoModel';
import { LoadingService } from '../services/loading-service';
import { DateTimeUtils } from '../utils/data-time.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alldata: any[] = [];

  proximaEntregaList!: any[];
  pagamentoAReceberList!: any[];
  emitirNfeList!: any[];
  emAprovacaoList!: any[];
  pagamentoAtrasadoList!: any[];

  displayedColumns = [
    { head: 'Nome', el: 'nome' },
    { head: 'Descricao', el: 'descricao' },
    { head: 'Moeda', el: 'moeda' },
    {
      head: 'Valor Estimado',
      el: 'valorEstimado',
      format: { tipo: 'PIPE', pipe: 'decimal' },
    },
  ];

  constructor(
    private fluxoTrabalhoService: FluxoDeTrabalhoService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);

    this.fluxoTrabalhoService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<FluxoDeTrabalhoModel>[]) =>
          changes.map((c: DocumentChangeAction<FluxoDeTrabalhoModel>) => ({
            id: c.payload.doc.id,
            cliente: c.payload.doc.data().cliente,
            projeto: c.payload.doc.data().projeto,
            pasta: c.payload.doc.data().linkArmazenamentoNuvem,
            status: c.payload.doc.data().status,
            statusString: this.getStatusDescription(
              c.payload.doc.data().status
            ),
            dataEntrega: DateTimeUtils.firebaseDateToDate(
              c.payload.doc.data().dataEntregaPrevista
            ),
            projetoEntregue: !!c.payload.doc.data().projetoEntregue,
            pagamentoRecebido: c.payload.doc.data().pagamentoRecebido,
            nfeEmitida: c.payload.doc.data().nfeEmitida ? true : false,
          }))
        )
      )
      .subscribe((entries) => {
        this.alldata = entries;
        this.loadProximasEntregas(entries);
        this.loadEmitirNFe(entries);
        this.loadPagamentoAReceber(entries);
        this.loadEmAprovacao(entries);
        this.loadPagamentoAtrasado(entries);

        this.loadingService.setLoading(false);
      });
  }

  loadProximasEntregas(data: any[]) {
    const filteredItems = data.filter(
      (item) =>
        item.status == 'EM_ANDAMENTO' &&
        item.dataEntrega >= new Date() &&
        !item.projetoEntregue
    );

    this.proximaEntregaList = filteredItems;
  }

  loadEmitirNFe(data: any[]) {
    const filteredItems = data.filter(
      (item) => item.status == 'CONCLUIDO' && item.nfeEmitida == false
    );
    this.emitirNfeList = filteredItems;
  }

  loadEmAprovacao(data: any[]) {
    const filteredItems = data.filter(
      (item) =>
        item.status == 'AGUARDANDO_FEEDBACK' && item.projetoEntregue == false
    );
    this.emAprovacaoList = filteredItems;
  }

  loadPagamentoAReceber(data: any[]) {
    const filteredItems = data.filter(
      (item) => item.pagamentoRecebido == false && item.nfeEmitida == true
    );
    this.pagamentoAReceberList = filteredItems;
  }

  loadPagamentoAtrasado(data: any[]) {
    const filteredItems = data.filter(
      (item) =>
        item.status == 'CONCLUIDO' &&
        item.dataEntrega <= new Date() &&
        !item.pagamentoRecebido
    );
    this.pagamentoAtrasadoList = filteredItems;
  }

  private getStatusDescription(status: FluxoTrabalhoStatusEnum) {
    const filtered = Object.entries(FluxoTrabalhoStatusEnum).filter(
      (i) => i[0] == status
    )[0];
    return filtered[1];
  }
}
