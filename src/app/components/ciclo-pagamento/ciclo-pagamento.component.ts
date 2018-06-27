import { Ciclo } from './../../model/ciclo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ciclo-pagamento',
  templateUrl: './ciclo-pagamento.component.html',
  styleUrls: ['./ciclo-pagamento.component.css']
})
export class CicloPagamentoComponent implements OnInit {

  @ViewChild("form")
  form: NgForm
  
  message: {};
  classCss: {};
  ciclo = new Ciclo('',null,null);

  constructor() {
    this.ciclo.creditos = [{}],
    this.ciclo.debitos = [{}]
   }

  ngOnInit() {
   
  }


  incluir(){

  }

  addCreditos(creditos){
   // console.log("antes" ,ciclo);
    this.ciclo.creditos.splice(creditos + 1, 0, {});
  
  }

  addDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.debitos.splice(deb + 1, 0, {});
  
  }

  private showMessage(message: {type: string, text: string}) : void{
    this.message = message;
    this.buildClass(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }
  
  private buildClass(type: string) : void{
    this.classCss = {
          'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  
}
