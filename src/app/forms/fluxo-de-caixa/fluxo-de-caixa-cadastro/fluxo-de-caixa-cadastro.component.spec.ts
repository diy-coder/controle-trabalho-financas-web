import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoDeCaixaCadastroComponent } from './fluxo-de-caixa-cadastro.component';

describe('FluxoDeCaixaCadastroComponent', () => {
  let component: FluxoDeCaixaCadastroComponent;
  let fixture: ComponentFixture<FluxoDeCaixaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluxoDeCaixaCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoDeCaixaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
