const apiUrl = 'http://localhost:3000';

const clienteForm = document.getElementById('cliente-form');
const pedidoForm = document.getElementById('pedido-form');
const listaPedidos = document.getElementById('lista-pedidos');
const clienteSelect = document.getElementById('cliente-id');

clienteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  await fetch(`${apiUrl}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  clienteForm.reset();
  carregarClientes();
});

pedidoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const clienteId = Number(document.getElementById('cliente-id').value);
  const produto = document.getElementById('produto').value;
  const quantidade = Number(document.getElementById('quantidade').value);
  const preco = Number(document.getElementById('preco').value);

  await fetch(`${apiUrl}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clienteId, produto, quantidade, preco })
  });

  pedidoForm.reset();
  carregarPedidos();
});

async function carregarClientes() {
  const resposta = await fetch(`${apiUrl}/clientes`);
  const clientes = await resposta.json();

  clienteSelect.innerHTML = '';
  clientes.forEach((cliente) => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = `${cliente.nome} (${cliente.email})`;
    clienteSelect.appendChild(option);
  });
}

async function carregarPedidos() {
  const resposta = await fetch(`${apiUrl}/pedidos`);
  const pedidos = await resposta.json();

  listaPedidos.innerHTML = '';
  pedidos.forEach((pedido) => {
    const li = document.createElement('li');
    li.textContent = `🧥 ${pedido.produto} (${pedido.quantidade} unid. x R$${pedido.preco}) - Cliente: ${pedido.nomeCliente} | Total: R$${pedido.total_obtido}`;
    listaPedidos.appendChild(li);
  });
}

document.getElementById('filtro-pedidos').addEventListener('input', function(e) {
    const termo = e.target.value.toLowerCase();
    const pedidos = document.querySelectorAll('#lista-pedidos li');
    
    pedidos.forEach(pedido => {
        const textoPedido = pedido.textContent.toLowerCase();
        pedido.style.display = textoPedido.includes(termo) ? 'flex' : 'none';
    });
});

// Adicione esta linha no final da função carregarPedidos():

carregarClientes();
carregarPedidos();
