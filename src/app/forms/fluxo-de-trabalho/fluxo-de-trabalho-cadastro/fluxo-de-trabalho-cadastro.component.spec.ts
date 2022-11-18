import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeTrabalhoCadastroComponent } from './fluxo-de-trabalho-cadastro.component';

describe('FluxoDeTrabalhoCadastroComponent', () => {
  let component: FluxoDeTrabalhoCadastroComponent;
  let fixture: ComponentFixture<FluxoDeTrabalhoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxoDeTrabalhoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoDeTrabalhoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
