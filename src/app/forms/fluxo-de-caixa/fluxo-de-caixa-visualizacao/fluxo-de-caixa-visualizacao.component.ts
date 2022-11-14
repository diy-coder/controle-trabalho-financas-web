import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { map } from 'rxjs';
import { FluxoDeCaixaModel } from 'src/app/models/fluxoDeCaixaModel';
import { LoadingService } from 'src/app/services/loading-service';
import { FluxoDeCaixaService } from '../fluxo-de-caixa.service';

@Component({
  selector: 'app-fluxo-de-caixa-visualizacao',
  templateUrl: './fluxo-de-caixa-visualizacao.component.html',
  styleUrls: ['./fluxo-de-caixa-visualizacao.component.scss'],
})
export class FluxoDeCaixaVisualizacaoComponent implements OnInit {
  data: any[] = [];
  originalData: any[] = [];
  monthValidOptions: any = [];
  total = {
    income: 0,
    expense: 0,
  };

  constructor(
    private service: FluxoDeCaixaService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);
    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<FluxoDeCaixaModel>[]) =>
          changes.map((c: DocumentChangeAction<FluxoDeCaixaModel>) => ({
            id: c.payload.doc.id,
            descricao: c.payload.doc.data().descricao,
            tipoOperacao: c.payload.doc.data().tipoOperacao,
            valor: c.payload.doc.data().valor,
            data: c.payload.doc.data()
              ? moment(
                  (
                    c.payload.doc.data()
                      .data as unknown as firebase.default.firestore.Timestamp
                  ).toDate()
                ).format('DD/MM/YYYY')
              : null,
            reference: c.payload.doc.data()
              ? moment(
                  (
                    c.payload.doc.data()
                      .data as unknown as firebase.default.firestore.Timestamp
                  ).toDate()
                ).format('MMMM - YYYY')
              : null,
            style: c.payload.doc.data().tipoOperacao,
            group: c.payload.doc.data()
              ? moment(
                  (
                    c.payload.doc.data()
                      .data as unknown as firebase.default.firestore.Timestamp
                  ).toDate()
                ).format('YYYY-MM')
              : 'UNGROUPED',
          }))
        )
      )
      .subscribe((data) => {
        this.data = this.sumarize(data, 'group');
        this.originalData = this.data;
        this.monthValidOptions = this.data.map((d: any) => d.referencia);
        this.loadingService.setLoading(false);
      });
  }

  sumarize(list: any[], property: string) {
    this.total.income = 0;
    this.total.expense = 0;

    const groupedItems = this.groupBy(list, property);

    const listaFinal: any[] = [];

    Object.keys(groupedItems).forEach((chave) => {
      const items = groupedItems[chave];

      const itemsSaida = items.filter(
        (item: any) => item.tipoOperacao == 'SAIDA'
      );
      const itemsEntrada = items.filter(
        (item: any) => item.tipoOperacao == 'ENTRADA'
      );

      const income = itemsEntrada.reduce(
        (a: any, b: any) => Number(a) + Number(b.valor),
        0
      );
      const expense = itemsSaida.reduce(
        (a: any, b: any) => Number(a) + Number(b.valor),
        0
      );
      this.total.income += income;
      this.total.expense += expense;

      listaFinal.push({
        referencia: chave,
        yearMonthReference: items[0].reference,
        resumo: {
          income: income,
          expense: expense,
          total: income - expense,
          month: chave.substring(5),
        },
        fluxoList: items,
      });
    });

    return listaFinal.sort((a: any, b: any) =>
      b.referencia.localeCompare(a.referencia)
    );
  }

  groupBy(list: any[], property: string) {
    const grouped = list.reduce((acc, d) => {
      if (Object.keys(acc).includes(d[property])) return acc;

      acc[d[property]] = list.filter((g) => g[property] === d[property]);
      return acc;
    }, {});

    return grouped;
  }

  filter = '';
  filterMonth = 'Selecione';

  monthChanged(month: any) {
    this.filterMonth = month;
    this.applyFilter(this.filter, this.filterMonth);
  }

  filterData(value: string) {
    this.filter = value;
    this.applyFilter(this.filter, this.filterMonth);
  }

  applyFilter(data: any, month: any) {
    this.filterMonth = month;

    let filteredData = this.originalData;

    if (month != 'Selecione') {
      filteredData = filteredData.filter((item) => item.referencia == month);
    }

    if (data) {
      filteredData = filteredData.map((d) => {
        return {
          reference: d.reference,
          resumo: d.resumo,
          fluxoList: d.fluxoList.filter(
            (f: any) =>
              f.descricao &&
              f.descricao.toUpperCase().includes(data.toUpperCase())
          ),
        };
      });
    }

    this.data = filteredData;
  }
}
