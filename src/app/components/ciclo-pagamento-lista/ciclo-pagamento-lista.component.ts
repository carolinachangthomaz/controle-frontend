import { Component, OnInit } from '@angular/core';
import { CicloPagamentoService } from '../../services/ciclo-pagamento.service';
import { Router } from '@angular/router';
import { Ciclo } from '../../model/ciclo.model';

@Component({
  selector: 'app-ciclo-pagamento-lista',
  templateUrl: './ciclo-pagamento-lista.component.html',
  styleUrls: ['./ciclo-pagamento-lista.component.css']
})
export class CicloPagamentoListaComponent implements OnInit {

  ciclos: Ciclo[] = [];;
  message: {};
  classCss: {};

  constructor(private cicloService: CicloPagamentoService,
             private router: Router) {
   
   }

  ngOnInit() {
   this.refresh();
  }

  visualizar(id: string){
    this.router.navigate(['/ciclo-pagamento',id]);
  }

  refresh(){
    this.cicloService.refresh().subscribe((response) => {
      
      this.ciclos = response;
      console.log(this.ciclos);
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
