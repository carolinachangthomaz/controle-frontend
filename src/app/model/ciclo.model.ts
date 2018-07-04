import { Conta } from "./conta.model";

export class Ciclo{
    id: string;
    nome: String;
    mes: Number;
    ano: Number;
    conta:Conta;
    creditos=[];
    debitos=[];
    
constructor(id: string, nome: String, mes: Number, ano: Number){}    

}