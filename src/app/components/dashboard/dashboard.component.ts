import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Sumario } from '../../model/sumario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sumario = new Sumario(null,null);
 
  constructor(public dashboardService:DashboardService) {
   
   }

  ngOnInit() {
    this.getSumario();
  }

  getSumario() {
    this.dashboardService.getSumario().subscribe((obj:Sumario) =>{
      this.sumario =  obj;
    })
  }
}
