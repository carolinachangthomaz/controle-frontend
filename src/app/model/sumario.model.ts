export class Sumario{
    constructor(
        public credito: number,
        public debito: number,
        public pago: number,
        public pendente: number,
        public saldo:number,
        public saldoCicloAnterior:number){}
}