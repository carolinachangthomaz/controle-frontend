import { DebitoDTO } from './debitoDTO';
import { Conta } from "./conta.model";

export class Ciclo{
    id: string;
    nome: String;
    mes: Number;
    ano: Number;
    saldo: number;
    totalCreditos: number;
    totalDebitos: number;
    conta:Conta;
    creditos=[];
    debitos:Array<DebitoDTO>;
    
constructor(id: string, nome: String, mes: Number, ano: Number){}    

}