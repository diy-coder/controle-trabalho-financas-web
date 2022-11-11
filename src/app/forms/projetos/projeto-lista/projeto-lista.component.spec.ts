import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoListaComponent } from './projeto-lista.component';

describe('ProjetoListaComponent', () => {
  let component: ProjetoListaComponent;
  let fixture: ComponentFixture<ProjetoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetoListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
