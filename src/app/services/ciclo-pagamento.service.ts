import { Ciclo } from './../model/ciclo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Observable } from 'rxjs';

@Injectable()
export class CicloPagamentoService {

  constructor(private http:HttpClient) { }

  refresh(): Observable<Ciclo[]>{
    return this.http.get<Ciclo[]>(`${APP_CONFIG.baseUrl}/ciclodepagamento`);
  }

  createOrUpdate(ciclo: Ciclo){
    if(ciclo._id != null && ciclo._id != ''){
      return this.http.put(`${APP_CONFIG.baseUrl}/ciclodepagamento/${ciclo._id}`, ciclo);
    }else{
      ciclo._id = null;
      return this.http.post(`${APP_CONFIG.baseUrl}/ciclodepagamento`, ciclo);
    }
  }

  findById(id: string){
    return this.http.get(`${APP_CONFIG.baseUrl}/ciclodepagamento/${id}`);
  }
  

}
