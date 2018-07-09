import { DebitoDescricao } from "./debitoDescricao.model";


export class DebitoDTO{
    id: string;
    data: string;
    valor: number;
    status: string;
    descricao: DebitoDescricao;
  
}