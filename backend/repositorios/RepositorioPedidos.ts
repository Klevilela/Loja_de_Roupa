import * as fs from 'fs';
import * as path from 'path';
import { Pedido } from '../modelos/Pedido';

const caminho = path.join(__dirname, '..', 'dados', 'pedidos.json');

export class RepositorioPedidos {
    private pedidos: Pedido[] = [];

    constructor() {
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8');
            this.pedidos = JSON.parse(dados);
        }
    }

    listar(): Pedido[] {
        return this.pedidos;
    }

    adicionar(pedido: Pedido): void {
        this.pedidos.push(pedido);
        fs.writeFileSync(caminho, JSON.stringify(this.pedidos, null, 2));
    }
}