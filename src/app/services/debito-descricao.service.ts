import { DebitoDescricao } from './../model/debitoDescricao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class DebitoDescricaoService {

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get(`${APP_CONFIG.baseUrl}/debitosdescricoes`);
  }

  createOrUpdate(debitoDescricao: DebitoDescricao){
    if(debitoDescricao.id != null && debitoDescricao.id != ''){
      return this.http.put(`${APP_CONFIG.baseUrl}/debitosdescricoes/${debitoDescricao.id}`, debitoDescricao);
    }else{
      debitoDescricao.id = null;
      return this.http.post(`${APP_CONFIG.baseUrl}/debitosdescricoes`, debitoDescricao);
    }
  }

  findById(id: string){
    return this.http.get(`${APP_CONFIG.baseUrl}/debitosdescricoes/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${APP_CONFIG.baseUrl}/debitosdescricoes/${id}`);
  }
}
