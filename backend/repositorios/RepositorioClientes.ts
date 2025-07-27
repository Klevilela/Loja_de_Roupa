import * as fs from 'fs';
import * as path from 'path';
import { Cliente } from '../modelos/Cliente';

const caminho = path.join(__dirname, '..', 'dados', 'clientes.json');

export class RepositorioClientes {
    private clientes: Cliente[] = [];

    constructor() {
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8');
            this.clientes = JSON.parse(dados);
        }
    }

    listar(): Cliente[] {
        return this.clientes;
    }

    adicionar(cliente: Cliente): void {
        this.clientes.push(cliente);
        fs.writeFileSync(caminho, JSON.stringify(this.clientes, null, 2));
    }
}