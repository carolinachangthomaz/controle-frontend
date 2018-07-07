import { Component, OnInit } from '@angular/core';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ciclo } from '../../model/ciclo.model';
import { Sumario } from '../../model/sumario.model';

@Component({
  selector: 'app-ciclo-pagamento-lista',
  templateUrl: './ciclo-pagamento-lista.component.html',
  styleUrls: ['./ciclo-pagamento-lista.component.css']
})
export class CicloPagamentoListaComponent implements OnInit {

  ciclos: Ciclo[] = [];
  sumario = new Sumario(null,null,null);
  message: {};
  classCss: {};

  constructor(private cicloService: CicloPagamentoService,
             private router: Router,
             private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findAllCiclosByContasId(id); 
    }
  }

  visualizar(id: string){
    this.router.navigate(['/ciclo-pagamento',id]);
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
          this.findAllCiclosByContasId(contaId);
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
