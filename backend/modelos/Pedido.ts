export class Pedido {
  constructor(
    public id: number,
    public clienteId: number,
    public produto: string,
    public quantidade: number,
    public preco: number
  ) {}

  get total(): number {
    return this.quantidade * this.preco;
  }
}
