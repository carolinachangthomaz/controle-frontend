import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Observable } from 'rxjs';
import { ClienteDTO } from '../model/clienteDTO.model';

@Injectable()
export class ClienteService {

  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get(`${APP_CONFIG.baseUrl}/clientes`);
  }

  createOrUpdate(clienteDTO: ClienteDTO){
    if(clienteDTO.id != null && clienteDTO.id != ''){
      return this.http.put(`${APP_CONFIG.baseUrl}/clientes/${clienteDTO.id}`, clienteDTO);
    }else{
      clienteDTO.id = null;
      return this.http.post(`${APP_CONFIG.baseUrl}/clientes`, clienteDTO);
    }
  }

  findById(id: string){
    return this.http.get(`${APP_CONFIG.baseUrl}/clientes/${id}`);
  }

  getContas(id: string){
    return this.http.get(`${APP_CONFIG.baseUrl}/clientes/${id}/contas`);
  }

  delete(id: string){
    return this.http.delete(`${APP_CONFIG.baseUrl}/clientes/${id}`);
  }
  
}
