import { Component, OnInit, ViewChild } from '@angular/core';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciclo } from '../../model/ciclo.model';
import { Sumario } from '../../model/sumario.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ciclo-pagamento-lista',
  templateUrl: './ciclo-pagamento-lista.component.html',
  styleUrls: ['./ciclo-pagamento-lista.component.css']
})
export class CicloPagamentoListaComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  ciclo = new Ciclo('','',null,null);
  ciclos: Ciclo[] = [];
  sumario = new Sumario(null,null,null,null,null);
  message: {};
  classCss: {};
  contaId: string;
  cicloId:string;
  

  constructor(private cicloService: CicloPagamentoService,
             private router: Router,
             private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    this.contaId = this.route.snapshot.params['id'];
    if(this.contaId != undefined){
      this.findAllCiclosByContasId(this.contaId); 
    }
  }

  visualizar(id: string){
    var mes = this.ciclos.find(x => x.id === id).mes;
    var ano = this.ciclos.find(x => x.id === id).ano;
     var mesAnterior:number;
     mesAnterior = mes - 1;
    
    var saldoAnterior = this.ciclos.filter(x => x.mes === mesAnterior&& x.ano === ano ).map(x => x.saldo);
    console.log("saldo anterior" +saldoAnterior);
    var json = JSON.stringify(this.ciclos);
    this.ciclos.forEach(function(obj, value){
      console.log("LIsta Ciclo -->> " +obj.nome);
    })
    //console.log(json);
      this.router.navigate(['/ciclo-pagamento',id], {queryParams: {saldoAnterior: saldoAnterior}});
  }

  criarNovoCiclo(){
    this.router.navigate(['/ciclo-pagamento'], {queryParams: {contaId: this.contaId}} );
}

clone(cicloId: string){
  console.log("Clone ---->>>>  " +cicloId);
  this.cicloId = cicloId;
}

cloneCreate(){
  this.ciclo.id = this.cicloId;
  this.cicloService.createClone(this.ciclo).subscribe((obj: Ciclo) => {
    console.log("CLONE OK >>>>>>>>> ");
    location.reload();
  },err =>{
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
  });
}

  calculadora(){
    var credito:number = 0;
    let debito = 0;
    let saldo = 0;

    if(this.ciclos.length >= 0){
      this.ciclos.forEach(function(key,index){
        credito +=  key.totalCreditos;
        debito +=  key.totalDebitos;
        saldo +=  key.saldo;
      })

      this.sumario.credito = credito;
      this.sumario.debito = debito;
      this.sumario.saldo = saldo;
      this.formatDouble();
    }
  }

  findAllCiclosByContasId(contaId: string){
    this.cicloService.findAllCiclosByContasId(contaId).subscribe((response) => {
      
      this.ciclos = response;
     this.calculadora();
    },err =>{
       this.showMessage({
         type: 'error',
         text: err['error']['errors'][0]
       });
    });
  }

  delete(contaId: string){
    this.message = {};
        this.cicloService.delete(contaId).subscribe((obj: Ciclo) => {
          this.showMessage({
             type: 'success',
             text: 'Ticket excluído'
          });
          location.reload();
        }, err =>{
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        })
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
 }}
