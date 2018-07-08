import { TestBed, inject } from '@angular/core/testing';

import { DebitoDescricaoService } from './debito-descricao.service';

describe('DebitoDescricaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebitoDescricaoService]
    });
  });

  it('should be created', inject([DebitoDescricaoService], (service: DebitoDescricaoService) => {
    expect(service).toBeTruthy();
  }));
});
