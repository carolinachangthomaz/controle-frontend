import { DebitoDescricao } from "./debitoDescricao.model";


export class DebitoDTO{
    id: string;
    data: any;
    valor: number;
    status: string;
    descricao: DebitoDescricao;
  
}