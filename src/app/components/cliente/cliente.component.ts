import { ClienteService } from './../../services/cliente.service';
import { Conta } from './../../model/conta.model';
import { ClienteDTO } from './../../model/clienteDTO.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  message: {};
  classCss: {};
  clienteDTO = new ClienteDTO('','',null);
  clientesDTO: ClienteDTO[] = [];
  
  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.clienteService.findAll().subscribe((obj: ClienteDTO[]) => {
      this.clientesDTO = obj;
      
   } , err => {
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
   });
 }

  delete(id: string){
    this.message = {};
        this.clienteService.delete(id).subscribe((obj: ClienteDTO) => {
          this.showMessage({
             type: 'success',
             text: 'Cliente excluído'
          });
        }, err =>{
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        })
  }

  findById(id: string){
    this.clienteService.findById(id).subscribe((obj: ClienteDTO) => {
      this.clienteDTO = obj;
    },err =>{
       this.showMessage({
         type: 'error',
         text: err['error']['errors'][0]
       });
    });
  }

  getContas(id: string){
    this.clienteService.getContas(id).subscribe((obj: ClienteDTO) => {
      this.clienteDTO = obj;
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
