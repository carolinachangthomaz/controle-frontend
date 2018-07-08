import { Conta } from './../../model/conta.model';
import { Ciclo } from './../../model/ciclo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';
import { ActivatedRoute } from '@angular/router';
import { Sumario } from '../../model/sumario.model';
import { DebitoDTO } from '../../model/debitoDTO';
import { DebitoDescricao } from '../../model/debitoDescricao.model';
import { DebitoDescricaoService } from '../../services/debito-descricao.service';


@Component({
  selector: 'app-ciclo-pagamento',
  templateUrl: './ciclo-pagamento.component.html',
  styleUrls: ['./ciclo-pagamento.component.css']
})
export class CicloPagamentoComponent implements OnInit {

  @ViewChild("form")
  form: NgForm
  
  debitoDescricao =new DebitoDescricao('','');
  debitodescricoes = [];
  message: {};
  classCss: {};
  ciclo = new Ciclo('','',null,null);
  sumario = new Sumario(null,null,null); 
  contaId:string;
  
  constructor(private cicloService: CicloPagamentoService,
              private route: ActivatedRoute,
              private debitodescricaoService: DebitoDescricaoService) {
    this.ciclo.creditos = [{}],
    this.ciclo.debitos = [new DebitoDTO()];
   }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findAllDebitodescricoes();
      this.findById(id);
      
    }else{
      this.route.queryParams.subscribe(params => {
         this.contaId = params['contaId'];
       
    });
      this.findAllDebitodescricoes();
      this.createNewCicle();
    }
  }

  findAllDebitodescricoes(){
    this.debitodescricaoService.findAll().subscribe((obj: DebitoDescricao[]) => {
      this.debitodescricoes = obj;
   } , err => {
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
   });
  }

  salvarDebitoDescricao(){
     this.debitodescricaoService.createOrUpdate(this.debitoDescricao).subscribe((obj: DebitoDescricao) => {
     
      var newOption = document.createElement("option");
         newOption.value = obj.id;
         newOption.text = this.debitoDescricao.nome;
    var select = document.getElementById("inputDescricao");
    select.appendChild(newOption);
    let element: HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
    element.click();
   } , err => {
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
   });
  }

  createNewCicle(){
     this.ciclo = new Ciclo('','',null,null);
     this.ciclo.conta = new Conta('','',null);
     this.ciclo.conta.id = this.contaId;
     this.ciclo.id = null;
     this.ciclo.creditos = [{}];
     this.ciclo.debitos = [new DebitoDTO()];

     this.sumario = new Sumario(null,null,null); 
  }

  calculadora(){
    this.sumario.credito = 0;
    this.sumario.debito = 0;
    let cred = 0;
    let deb = 0;

    if(this.ciclo != null){
      this.ciclo.creditos.forEach(function({valor}){
        console.log(valor);
        cred += !valor || isNaN(valor) ? 0 : parseFloat(valor);
      })

      this.ciclo.debitos.forEach(function(obj, value){
        deb += !obj.valor || isNaN(obj.valor) ? 0 : obj.valor;
      })

      this.sumario.credito = cred;
      this.sumario.debito = deb;
      this.sumario.saldo = this.sumario.credito - this.sumario.debito;
      this.formatDouble();
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
        this.calculadora();
      }
    }  
  }
    
   

  cloneCreditos(cred){
    //console.log("antes" ,cred);
    this.ciclo.creditos.splice(cred + 1, 0, cred);
    this.calculadora();
    //console.log("depois" ,this.ciclo.creditos);
  }

  addDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.debitos.splice(deb + 1, 0, new DebitoDTO());
  }

  removeDebitos(deb){
    //console.log("antes" ,ciclo);
    var index = this.ciclo.debitos.indexOf(deb);
    if (index > -1) {
      this.ciclo.debitos.splice(index, 1);
      this.calculadora();
    }
  }
  
  cloneDebitos(deb){
    //console.log("antes" ,ciclo);
    this.ciclo.creditos.splice(deb + 1, 0, deb);
    this.calculadora();
  }


  createOrUpdate(){
    this.ciclo.creditos.shift();
    this.ciclo.debitos.shift();
    this.cicloService.createOrUpdate(this.ciclo).subscribe((obj: Ciclo) => {
      console.log("FUNCIONOU!createorupdate >>>>>>>>> " ,obj);
      let creditos = [{}];
      let debitos = [{"descricao": {id: "0", nome: null}}];

      this.ciclo.id = obj.id;

      this.ciclo.conta = new Conta('','',null);
     
      this.ciclo.conta.id = obj.conta.id
      this.ciclo.conta.nome = obj.conta.nome
      this.ciclo.conta.clienteDTO = obj.conta['cliente'];
     
      this.ciclo.nome = obj.nome;
      this.ciclo.mes = obj.mes;
      this.ciclo.ano =obj.ano;

      obj.creditos.forEach(function(obj, value){
        creditos.push(obj);
      })

      obj.debitos.forEach(function(obj, value){
        debitos.push(obj);
      })
      
      this.ciclo.creditos = creditos;
      this.ciclo.debitos = debitos as  DebitoDTO[];
     },err =>{
       this.showMessage({
         type: 'error',
         text: err['error']['errors'][0]
       });
    });
  }

  findById(id: string){
    this.cicloService.findById(id).subscribe((obj: Ciclo) => {
      let creditos = [{}];
      let debitos = [{"descricao": {id: "0", nome: null}}];
      
      this.ciclo.id = obj.id;

      this.ciclo.conta = new Conta('','',null);
     
      this.ciclo.conta.id = obj.conta.id
      this.ciclo.conta.nome = obj.conta.nome
      this.ciclo.conta.clienteDTO = obj.conta['cliente'];
     
      this.ciclo.nome = obj.nome;
      this.ciclo.mes = obj.mes;
      this.ciclo.ano =obj.ano;
  
      obj.creditos.forEach(function(obj, value){
        creditos.push(obj);
      })

      obj.debitos.forEach(function(obj, value){
        debitos.push(obj);
      })
      
      this.ciclo.creditos = creditos;
      this.ciclo.debitos = debitos as  DebitoDTO[];
      
      this.calculadora();
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

  formatDouble() {
    document.getElementById("credito").innerHTML = this.sumario.credito.toFixed(2);
     document.getElementById("debito").innerHTML = this.sumario.debito.toFixed(2);
     document.getElementById("saldo").innerHTML = this.sumario.saldo.toFixed(2);
 }

}
