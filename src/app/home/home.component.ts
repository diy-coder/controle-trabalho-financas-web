import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
import { FluxoDeTrabalhoService } from '../forms/fluxo-de-trabalho/fluxo-de-trabalho.service';
import { FluxoDeTrabalhoModel } from '../models/fluxoDeTrabalhoModel';
import { DateTimeUtils } from '../utils/data-time.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alldata: any[] = [];

  proximaEntregaList$!: Observable<any>;
  pagamentoAReceberList$!: Observable<any>;
  emitirNfeList$!: Observable<any>;

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

  constructor(private fluxoTrabalhoService: FluxoDeTrabalhoService) {}

  ngOnInit(): void {
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
            status: '' + c.payload.doc.data().status,
            dataEntrega: DateTimeUtils.firebaseDateToDate(
              c.payload.doc.data().dataEntregaPrevista
            ),
            projetoEntregue: c.payload.doc.data().projetoEntregue,
            pagamentoRecebido: c.payload.doc.data().pagamentoRecebido,
            nfeEmitida: c.payload.doc.data().nfeEmitida ? true : false,
          }))
        )
      )
      .subscribe((entries) => {
        this.alldata = entries;
        this.loadProximasEntregas(entries);
        this.loadPagamentoAReceber(entries);
        this.loadEmitirNFe(entries);
      });
  }

  loadProximasEntregas(data: any[]) {
    const filteredItems = data.filter(
      (item) =>
        item.status == 'EM_ANDAMENTO' &&
        item.dataEntrega >= new Date() &&
        !item.projetoEntregue
    );

    this.proximaEntregaList$ = of(filteredItems);
  }

  loadPagamentoAReceber(data: any[]) {
    const filteredItems = data.filter(
      (item) =>
        item.status == 'CONCLUIDO' &&
        item.pagamentoRecebido == false &&
        item.nfeEmitida == true
    );
    this.pagamentoAReceberList$ = of(filteredItems);
  }

  loadEmitirNFe(data: any[]) {
    const filteredItems = data.filter(
      (item) => item.status == 'CONCLUIDO' && item.nfeEmitida == false
    );
    this.emitirNfeList$ = of(filteredItems);
  }
}
