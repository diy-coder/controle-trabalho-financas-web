import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeCaixaVisualizacaoComponent } from './fluxo-de-caixa-visualizacao.component';

describe('FluxoDeCaixaVisualizacaoComponent', () => {
  let component: FluxoDeCaixaVisualizacaoComponent;
  let fixture: ComponentFixture<FluxoDeCaixaVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxoDeCaixaVisualizacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoDeCaixaVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
