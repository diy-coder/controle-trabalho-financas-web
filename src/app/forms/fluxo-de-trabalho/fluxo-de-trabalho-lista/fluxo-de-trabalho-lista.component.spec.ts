import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeTrabalhoListaComponent } from './fluxo-de-trabalho-lista.component';

describe('FluxoDeTrabalhoListaComponent', () => {
  let component: FluxoDeTrabalhoListaComponent;
  let fixture: ComponentFixture<FluxoDeTrabalhoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxoDeTrabalhoListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoDeTrabalhoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
