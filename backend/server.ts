import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração dos caminhos
const dadosPath = path.join(__dirname, 'dados');
const clientesPath = path.join(dadosPath, 'clientes.json');
const pedidosPath = path.join(dadosPath, 'pedidos.json');
const frontendPath = path.join(__dirname, '../../frontend');

// Tipos
type Cliente = { id: number, nome: string, email: string };
type Pedido = { id: number, clienteId: number, produto: string, quantidade: number, preco: number };

// Funções auxiliares
function lerArquivo<T>(caminho: string): T[] {
  if (!fs.existsSync(caminho)) return [];
  return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
}

function escreverArquivo<T>(caminho: string, dados: T[]) {
  fs.mkdirSync(dadosPath, { recursive: true }); // Garante que a pasta existe
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// Middleware para servir arquivos estáticos
app.use(express.static(frontendPath));

// Rotas da API
app.post('/clientes', (req, res) => {
  const clientes = lerArquivo<Cliente>(clientesPath);
  const novo = { id: Date.now(), ...req.body };
  clientes.push(novo);
  escreverArquivo(clientesPath, clientes);
  res.status(201).json(novo);
});

app.get('/clientes', (_, res) => {
  const clientes = lerArquivo<Cliente>(clientesPath);
  res.json(clientes);
});

app.post('/pedidos', (req, res) => {
  const pedidos = lerArquivo<Pedido>(pedidosPath);
  const novo = { id: Date.now(), ...req.body };
  pedidos.push(novo);
  escreverArquivo(pedidosPath, pedidos);
  res.status(201).json(novo);
});

app.get('/pedidos', (_, res) => {
  const pedidos = lerArquivo<Pedido>(pedidosPath);
  const clientes = lerArquivo<Cliente>(clientesPath);

  const resposta = pedidos.map(p => {
    const cliente = clientes.find(c => c.id === p.clienteId);
    return {
      ...p,
      nomeCliente: cliente ? cliente.nome : 'Desconhecido',
      total_obtido: (p.quantidade * p.preco).toFixed(2)
    };
  });

  res.json(resposta);
});

// Rota para servir o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
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