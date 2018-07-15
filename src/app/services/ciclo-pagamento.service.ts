import { Ciclo } from './../model/ciclo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Observable } from 'rxjs';

@Injectable()
export class CicloPagamentoService {

  constructor(private http:HttpClient) { }

  findAllCiclosByContasId(contaId: String): Observable<Ciclo[]>{
    return this.http.get<Ciclo[]>(`${APP_CONFIG.baseUrl}/contas/${contaId}/ciclos`);
  }

  createOrUpdate(ciclo: Ciclo){
    if(ciclo.id != null && ciclo.id != ''){
      return this.http.put(`${APP_CONFIG.baseUrl}/ciclos/${ciclo.id}`, ciclo);
    }else{
      return this.http.post(`${APP_CONFIG.baseUrl}/ciclos`, ciclo);
    }
  }

  createClone(ciclo: Ciclo){
    return this.http.post(`${APP_CONFIG.baseUrl}/ciclos/clone`, ciclo);
  }

  getSaldoMesAnterior(mes: number, ano:number){
    return this.http.get(`${APP_CONFIG.baseUrl}/ciclos?mes=${mes}&ano=${ano}`);
  }

  findById(id: string){
    return this.http.get(`${APP_CONFIG.baseUrl}/ciclos/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${APP_CONFIG.baseUrl}/ciclos/${id}`);
  }
  

}
