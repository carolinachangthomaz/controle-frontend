import { ClienteDTO } from "./clienteDTO.model";


export class Conta{
    id: string;
    nome: string;
    saldo: number;
    clienteDTO: ClienteDTO;
    
constructor(id: string, nome: string,saldo: number){}    

}