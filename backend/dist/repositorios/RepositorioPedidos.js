"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioPedidos = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const caminho = path.join(__dirname, '..', 'dados', 'pedidos.json');
class RepositorioPedidos {
    constructor() {
        this.pedidos = [];
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8');
            this.pedidos = JSON.parse(dados);
        }
    }
    listar() {
        return this.pedidos;
    }
    adicionar(pedido) {
        this.pedidos.push(pedido);
        fs.writeFileSync(caminho, JSON.stringify(this.pedidos, null, 2));
    }
}
exports.RepositorioPedidos = RepositorioPedidos;
