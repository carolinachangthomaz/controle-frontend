import { Conta } from './../../model/conta.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDTO } from '../../model/clienteDTO.model';

@Component({
  selector: 'app-cliente-contas',
  templateUrl: './cliente-contas.component.html',
  styleUrls: ['./cliente-contas.component.css']
})
export class ClienteContasComponent implements OnInit {

  message: {};
  classCss: {};
  contas: Conta[] = [];

  constructor(private clienteService: ClienteService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.getContas(id);
    }
  }

  getContas(id: string){
    this.clienteService.getContasByCliente(id).subscribe((obj: Conta[]) => {
      this.contas = obj;
    },err =>{
       this.showMessage({
         type: 'error',
         text: err['error']['errors'][0]
       });
    });
  }

  getCliclosByContaId(id: string){
    this.router.navigate(['/ciclo-pagamento-lista',id]);
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
