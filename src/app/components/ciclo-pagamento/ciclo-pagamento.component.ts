import { Ciclo } from './../../model/ciclo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';
import { ActivatedRoute } from '@angular/router';

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
  ciclo = new Ciclo('','',null,null);

  constructor(private cicloService: CicloPagamentoService,
              private route: ActivatedRoute) {
    this.ciclo.creditos = [{}],
    this.ciclo.debitos = [{}]
   }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  addCreditos(cred){
    //console.log("antes" ,cred);
    this.ciclo.creditos.splice(cred + 1, 0, {});
    //console.log("depois" ,this.ciclo.creditos);
  }

  removeCreditos(cred){
    //console.log("antes" ,cred);
    if(this.ciclo.creditos.length > 1){
      //this.ciclo.creditos.splice(cred,1);
      var index = this.ciclo.creditos.indexOf(cred);
      if (index > -1) {
        this.ciclo.creditos.splice(index, 1);
      }
    }  
  }
    
   

  cloneCreditos(cred){
    //console.log("antes" ,cred);
    this.ciclo.creditos.splice(cred + 1, 0, cred);
    //console.log("depois" ,this.ciclo.creditos);
  }

  addDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.debitos.splice(deb + 1, 0, {});
  }

  removeDebitos(deb){
    //console.log("antes" ,ciclo);
    var index = this.ciclo.debitos.indexOf(deb);
    if (index > -1) {
      this.ciclo.debitos.splice(index, 1);
    }
  }
  
  cloneDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.creditos.splice(deb + 1, 0, deb);
  }


  createOrUpdate(){
    console.log("createorupdate >>>>>>>>>>>>>>>>>> ", this.ciclo);
    var indexCredito = this.ciclo.creditos[0];
    this.ciclo.creditos.splice(indexCredito, 1);
  
    var indexDebito = this.ciclo.debitos[0];
    this.ciclo.debitos.splice(indexDebito, 1);
  
   this.cicloService.createOrUpdate(this.ciclo).subscribe((obj: Ciclo) => {
    console.log("FUNCIONOU!createorupdate >>>>>>>>> " ,obj);
  },err =>{
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
  });
   
  }

  findById(id: string){
    this.cicloService.findById(id).subscribe((obj: Ciclo) => {
      this.ciclo._id = obj._id;
      this.ciclo.nome = obj.nome;
      this.ciclo.mes = obj.mes;
      this.ciclo.ano =obj.ano;
      this.ciclo.creditos = obj.creditos;
      this.ciclo.debitos = obj.debitos;
      this.ciclo.creditos.push({});
      this.ciclo.debitos.push({});
      console.log("findById" , this.ciclo);
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
