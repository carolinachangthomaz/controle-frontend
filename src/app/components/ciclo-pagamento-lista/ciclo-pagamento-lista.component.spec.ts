import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloPagamentoListaComponent } from './ciclo-pagamento-lista.component';

describe('CicloPagamentoListaComponent', () => {
  let component: CicloPagamentoListaComponent;
  let fixture: ComponentFixture<CicloPagamentoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloPagamentoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloPagamentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
