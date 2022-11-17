import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import * as moment from 'moment';
import { map } from 'rxjs';
import { TimeTrackerModel } from 'src/app/models/timeTrackerModel';
import { LoadingService } from 'src/app/services/loading-service';
import { TimeTrackerService } from '../time-tracker.service';
@Component({
  selector: 'app-time-tracker-visualizacao',
  templateUrl: './time-tracker-visualizacao.component.html',
  styleUrls: ['./time-tracker-visualizacao.component.scss'],
})
export class TimeTrackerVisualizacaoComponent implements OnInit {
  calendar!: Calendar;
  dadosAgrupados: any[] = [];

  constructor(
    private service: TimeTrackerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingService.setLoading(true);
    }, 0);

    this.service
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: DocumentChangeAction<TimeTrackerModel>[]) =>
          changes.map((c: DocumentChangeAction<TimeTrackerModel>) => ({
            id: c.payload.doc.id,
            projeto: c.payload.doc.data().projeto,
            timeSpent: c.payload.doc.data().timeSpent,
            minutesTotalSpent: c.payload.doc.data().minutesTotalSpent,
            dataInicio: this.getConvertedData(c.payload.doc.data().dataInicio),
            dataTermino: this.getConvertedData(
              c.payload.doc.data().dataTermino
            ),
          }))
        )
      )
      .subscribe((data) => {
        this.dadosAgrupados = this.loadData(data);
        this.loadCalendar();
        this.carregarEventos(this.dadosAgrupados);
        this.loadingService.setLoading(false);
      });
  }

  private getConvertedData(date: Date) {
    return date
      ? (date as unknown as firebase.default.firestore.Timestamp).toDate()
      : null;
  }

  loadCalendar() {
    const calendarEl: any = document.getElementById('calendar');

    const dataMoment = moment(new Date());
    const utcWeek = new Date().getUTCDay();
    dataMoment.add(8 - utcWeek, 'days');

    this.calendar = new Calendar(calendarEl, {
      datesSet: (data) => {
        this.presentSummary();
      },
      plugins: [dayGridPlugin, timeGridWeek, interactionPlugin],
      height: 600,
      selectAllow: function (select) {
        return moment().diff(select.start) <= 0;
      },
      showNonCurrentDates: true,
      selectable: true,
      themeSystem: 'Lux',
      editable: true,
      buttonText: {
        today: 'Ir para a Data Atual',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        list: 'Lista',
      },
      dateClick: (args) => {
        this.dayClick(args.date, args.dateStr, args.jsEvent, args.view);
      },
      eventClick: (args) => {},
      titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },

      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
      },

      headerToolbar: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay today custom1',
        center: 'title',
        right: 'custom2 prevYear,prev,next,nextYear',
      },
      customButtons: {
        custom1: {
          text: 'custom 1',
          click: () => {
            this.custonButton1Click();
          },
        },
        custom2: {
          text: 'custom 2',
          click: function () {
            alert('clicked custom button 2!');
          },
        },
      },
    });
    this.calendar.render();
  }

  custonButton1Click() {}

  dayClick(date: Date, dateStr: any, jsEvent: any, activeView: any) {
    //console.log(date);
  }

  summary: any[] = [];
  presentSummary() {
    const group = moment(this.calendar.getCurrentData().currentDate).format(
      'YYYY-MM'
    );
    const dataFiltered = this.dadosAgrupados.filter((item) =>
      item.data.startsWith(group)
    );
    const allItems = dataFiltered.flatMap((item) => item.items);

    var result: any[] = [];
    allItems.reduce(function (res, value) {
      if (!res[value.projeto]) {
        res[value.projeto] = { projeto: value.projeto, totalMinutes: 0 };
        result.push(res[value.projeto]);
      }
      res[value.projeto].totalMinutes += value.totalMinutes;
      return res;
    }, {});

    this.summary = result.map((item) => ({
      projeto: item.projeto,
      tempoGasto: this.secondsToHMS(60 * item.totalMinutes),
    }));
  }

  carregarEventos(dataEvents: any[]) {
    dataEvents.forEach((timeEntry) => {
      if (!this.calendar.getEventById('' + timeEntry.data)) {
        timeEntry.items.forEach((item: any) => {
          this.calendar.addEvent({
            date: timeEntry.data,
            id: timeEntry.data,
            title:
              item.projeto +
              ' - (' +
              this.secondsToHMS(60 * item.totalMinutes) +
              ')',
            editable: false,
            extendedProps: {
              dataAtual: timeEntry.data,
            },
          });
        });
      }
    });
  }

  secondsToHMS(seconds: any) {
    const hours = parseInt('' + seconds / 3600);
    seconds = seconds % 3600;
    const minutes = parseInt('' + seconds / 60);
    seconds = seconds % 60;
    return (
      this.pad(hours, 2) +
      ':' +
      this.pad(minutes, 2) +
      ':' +
      this.pad(seconds, 2)
    );
  }

  pad(value: any, leadingZeros: number) {
    let s = '';
    for (let i = 0; i < leadingZeros; i++) {
      s += '0';
    }
    s += value;

    return s.substring(s.length - leadingZeros);
  }

  loadData(data: any[]) {
    const dataWithGroup = data
      .filter((item) => item.dataInicio != '' && item.dataTermino != '')
      .map((item) => ({
        id: item.id,
        user_creation: item.user_creation,
        projeto: item.projeto,
        dataInicio: item.dataInicio,
        dataTermino: item.dataTermino,
        timeSpent: item.timeSpent,
        minutesTotalSpent: item.minutesTotalSpent,
        group: moment(
          moment(
            item.dataInicio as unknown as firebase.default.firestore.Timestamp
          ).toDate()
        ).format('YYYY-MM-DD'),
      }));

    let result: any[] = [];
    dataWithGroup.forEach((element) => {
      const dateGroup = result.filter(
        (item: any) => item.data == element.group
      );
      if (dateGroup.length == 0) {
        result.push({
          data: element.group,
          items: [
            {
              projeto: element.projeto,
              totalMinutes: element.minutesTotalSpent,
            },
          ],
        });
      } else {
        const items = dateGroup[0].items.filter(
          (item: any) => item.projeto == element.projeto
        );

        if (items.length > 0) {
          items[0].totalMinutes += element.minutesTotalSpent;
        } else {
          const newItem = {
            projeto: element.projeto,
            totalMinutes: element.minutesTotalSpent,
          };
          dateGroup[0].items.push(newItem);
        }
      }
    });

    return result;
  }

  groupBy(list: any[], property: string) {
    const grouped = list.reduce((acc, d) => {
      if (Object.keys(acc).includes(d[property])) return acc;

      acc[d[property]] = list.filter((g) => g[property] === d[property]);
      return acc;
    }, {});

    return grouped;
  }
}
