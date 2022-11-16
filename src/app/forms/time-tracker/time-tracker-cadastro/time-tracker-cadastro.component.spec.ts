import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackerCadastroComponent } from './time-tracker-cadastro.component';

describe('TimeTrackerCadastroComponent', () => {
  let component: TimeTrackerCadastroComponent;
  let fixture: ComponentFixture<TimeTrackerCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTrackerCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackerCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
