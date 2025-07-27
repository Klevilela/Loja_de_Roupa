"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
class Pedido {
    constructor(id, clienteId, produto, quantidade, preco) {
        this.id = id;
        this.clienteId = clienteId;
        this.produto = produto;
        this.quantidade = quantidade;
        this.preco = preco;
    }
    get total() {
        return this.quantidade * this.preco;
    }
}
exports.Pedido = Pedido;
