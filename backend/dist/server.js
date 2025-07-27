"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configuração dos caminhos
const dadosPath = path_1.default.join(__dirname, 'dados');
const clientesPath = path_1.default.join(dadosPath, 'clientes.json');
const pedidosPath = path_1.default.join(dadosPath, 'pedidos.json');
const frontendPath = path_1.default.join(__dirname, '../../frontend');
// Funções auxiliares
function lerArquivo(caminho) {
    if (!fs_1.default.existsSync(caminho))
        return [];
    return JSON.parse(fs_1.default.readFileSync(caminho, 'utf-8'));
}
function escreverArquivo(caminho, dados) {
    fs_1.default.mkdirSync(dadosPath, { recursive: true }); // Garante que a pasta existe
    fs_1.default.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}
// Middleware para servir arquivos estáticos
app.use(express_1.default.static(frontendPath));
// Rotas da API
app.post('/clientes', (req, res) => {
    const clientes = lerArquivo(clientesPath);
    const novo = Object.assign({ id: Date.now() }, req.body);
    clientes.push(novo);
    escreverArquivo(clientesPath, clientes);
    res.status(201).json(novo);
});
app.get('/clientes', (_, res) => {
    const clientes = lerArquivo(clientesPath);
    res.json(clientes);
});
app.post('/pedidos', (req, res) => {
    const pedidos = lerArquivo(pedidosPath);
    const novo = Object.assign({ id: Date.now() }, req.body);
    pedidos.push(novo);
    escreverArquivo(pedidosPath, pedidos);
    res.status(201).json(novo);
});
app.get('/pedidos', (_, res) => {
    const pedidos = lerArquivo(pedidosPath);
    const clientes = lerArquivo(clientesPath);
    const resposta = pedidos.map(p => {
        const cliente = clientes.find(c => c.id === p.clienteId);
        return Object.assign(Object.assign({}, p), { nomeCliente: cliente ? cliente.nome : 'Desconhecido', total_obtido: (p.quantidade * p.preco).toFixed(2) });
    });
    res.json(resposta);
});
// Rota para servir o frontend
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, 'index.html'));
});
// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`API disponível em:
  - GET /clientes
  - POST /clientes
  - GET /pedidos
  - POST /pedidos`);
});
