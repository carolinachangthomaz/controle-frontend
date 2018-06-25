import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloPagamentoComponent } from './ciclo-pagamento.component';

describe('CicloPagamentoComponent', () => {
  let component: CicloPagamentoComponent;
  let fixture: ComponentFixture<CicloPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
