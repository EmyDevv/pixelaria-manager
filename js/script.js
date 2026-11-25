let pedidos = [

];

const pedidosSalvos = localStorage.getItem("pedidos");

if (pedidosSalvos) {
    pedidos = JSON.parse(pedidosSalvos);
}

function salvarPedidos() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Encontrar a area onde os pedidos serão exibidos
const listaPedidos = document.getElementById("lista-pedidos");
console.log(listaPedidos);

function mostrarPedidos() {

    listaPedidos.innerHTML = "";

    pedidos.forEach(function(pedido) {

        const item = document.createElement("div");

        item.innerHTML = `
            <div class="pedido-topo">
                <h3>Pedido #${pedido.id}</h3>
                <span class="status ${pedido.status.toLowerCase().replaceAll(" ", "-")}">
                    ${pedido.status}
                </span>
            </div>

                <p>Cliente: ${pedido.cliente}</p>
                <p>Produto: ${pedido.produto}</p>
                <p class="valor">R$ ${pedido.valor.toFixed(2).replace(".", ",")}</p>

                <label for="status-${pedido.id}">Alterar Status:</label>

                <select id="status-${pedido.id}" class="seletor-status">
                    <option value="Em Andamento" ${pedido.status === "Em Andamento" ? "selected" : ""}>Em Andamento</option>
                    <option value="Pronto" ${pedido.status === "Pronto" ? "selected" : ""}>Pronto</option>
                    <option value="Entregue" ${pedido.status === "Entregue" ? "selected" : ""}>Entregue</option>
                </select>
                <hr>
        `;
        listaPedidos.appendChild(item);

        const seletorStatus = document.getElementById(`status-${pedido.id}`);
        seletorStatus.addEventListener("change", function() {
            pedido.status = seletorStatus.value;
            salvarPedidos();
            mostrarPedidos();
        });
    });
}

mostrarPedidos();

const formulario = document.getElementById("form-pedido");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    const valor = Number(document.getElementById("valor").value);
    const status = document.getElementById("status").value;

    const novoPedido = {
        id: pedidos.length + 1,
        cliente: cliente,
        produto: produto,
        valor: valor,
        status: status
    };

    pedidos.push(novoPedido);
    salvarPedidos();
    mostrarPedidos();
    formulario.reset();
});