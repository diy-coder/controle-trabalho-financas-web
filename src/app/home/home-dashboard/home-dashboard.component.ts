import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
})
export class HomeDashboardComponent implements OnInit, OnChanges {
  @Input() data!: any;
  @Input() titulo = '';
  @Input() subTitulo = '';
  @Input() footer = '';
  @Input() showFooter = false;
  @Input() icone = '';
  @Input() classe = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
    }
  }
}
