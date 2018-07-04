import { ClienteDTO } from "./clienteDTO.model";


export class Conta{
    id: string;
    nome: string;
    saldo: Number;
    clienteDTO: ClienteDTO;
    
constructor(id: string, nome: string,saldo: Number){}    

}