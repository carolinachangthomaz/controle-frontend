import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';

@Injectable()
export class DashboardService {

  constructor(private http:HttpClient) { }

  getSumario(){
  return this.http.get(`${APP_CONFIG.baseUrl}/sumarioDePagamento`);
  }
}
