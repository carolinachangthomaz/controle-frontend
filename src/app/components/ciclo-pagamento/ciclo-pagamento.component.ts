import { Ciclo } from './../../model/ciclo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';

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

  constructor(private cicloService: CicloPagamentoService) {
    this.ciclo.creditos = [{}],
    this.ciclo.debitos = [{}]
   }

  ngOnInit() {
   
  }

  addCreditos(cred){
   console.log("antes" ,cred);
    this.ciclo.creditos.splice(cred + 1, 0, {});
    console.log("depois" ,this.ciclo.creditos);
  }

  addDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.debitos.splice(deb + 1, 0, {});
  }

  registrar(){
    console.log("registrar", this.ciclo);
   
    var indexCredito = this.ciclo.creditos[0];
    this.ciclo.creditos.splice(indexCredito, 1);
  
    var indexDebito = this.ciclo.debitos[0];
    this.ciclo.debitos.splice(indexDebito, 1);
  
   this.cicloService.create(this.ciclo).subscribe((obj: Ciclo) => {
    console.log("FUNCIONOU" ,obj);
  },err =>{
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
  });
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
