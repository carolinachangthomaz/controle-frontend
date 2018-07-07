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
  ciclo = new Ciclo('','',null,null);
  total: Number; 
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
    let cred = 0;
    let deb = 0;

    if(this.ciclo != null){
      this.ciclo.creditos.forEach(function({valor}){
        console.log(valor);
        cred += !valor || isNaN(valor) ? 0 : parseFloat(valor);
      })

      this.ciclo.debitos.forEach(function({valor}){
        deb += !valor || isNaN(valor) ? 0 : parseFloat(valor);
      })
  
    }
  }

  findAllCiclosByContasId(contaId: string){
    this.cicloService.findAllCiclosByContasId(contaId).subscribe((response) => {
      
      this.ciclos = response;
      this.ciclos.forEach(function(key,index){
        console.log("key" ,key);
      })
      
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

  findById(id: string){
    this.cicloService.findById(id).subscribe((obj: Ciclo) => {
      let creditos = [{}];
      let debitos = [{}];
      this.ciclo.id = obj.id;
      this.ciclo.nome = obj.nome;
      this.ciclo.mes = obj.mes;
      this.ciclo.ano =obj.ano;
      this.ciclo.saldo =obj.saldo;
      this.ciclo.totalCreditos =obj.totalCreditos;
      this.ciclo.totalDebitos =obj.totalDebitos;
      
      obj.creditos.forEach(function(obj, value){
        creditos.push(obj);
      })
      obj.debitos.forEach(function(obj, value){
        debitos.push(obj);
      })

      this.ciclo.creditos = creditos;
      this.ciclo.debitos = debitos;
      
      
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
}
