import { Ciclo } from './../model/ciclo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class CicloPagamentoService {

  constructor(private http:HttpClient) { }

  create(ciclo: Ciclo){
    return this.http.post(`${APP_CONFIG.baseUrl}/ciclodepagamento`, ciclo);
  }
}
