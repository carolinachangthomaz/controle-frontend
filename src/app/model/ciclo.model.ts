import { Conta } from "./conta.model";

export class Ciclo{
    id: string;
    nome: String;
    mes: Number;
    ano: Number;
    saldo: Number;
    totalCreditos: Number;
    totalDebitos: Number;
    conta:Conta;
    creditos=[];
    debitos=[];
    
constructor(id: string, nome: String, mes: Number, ano: Number){}    

}