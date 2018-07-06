import { Conta } from "./conta.model";

export class ClienteDTO{
    id: string;
    nome: String;
    email: String;
    contas: Conta[] = [];

    constructor(id: string, nome: String, email: String){}   
}