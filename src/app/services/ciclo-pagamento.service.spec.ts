import { TestBed, inject } from '@angular/core/testing';

import { CicloPagamentoService } from './ciclo-pagamento.service';

describe('CicloPagamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CicloPagamentoService]
    });
  });

  it('should be created', inject([CicloPagamentoService], (service: CicloPagamentoService) => {
    expect(service).toBeTruthy();
  }));
});
