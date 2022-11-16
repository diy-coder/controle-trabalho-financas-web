import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackerVisualizacaoComponent } from './time-tracker-visualizacao.component';

describe('TimeTrackerVisualizacaoComponent', () => {
  let component: TimeTrackerVisualizacaoComponent;
  let fixture: ComponentFixture<TimeTrackerVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTrackerVisualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackerVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
