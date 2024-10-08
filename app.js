/* Hamburger funcionalidade  */
const botao = document.querySelector('.menu__botao');
const navList = document.querySelector('.menu__lista');
const menuNav = document.querySelector('.menu');

botao.addEventListener('click', () => {
    menuNav.classList.toggle('menu-active');
    navList.style.display = 'flex';
});

navList.addEventListener('click', () => {
    navList.style.display = 'none';
});

const precos = {
    "São Paulo → Minas Gerais": {
        "Economica": 799,
        "Economica Premium": 1399,
        "Executiva": 1999
    },
    "Rio de Janeiro → Acre": {
        "Economica": 899,
        "Economica Premium": 1499
    }
};

let destinoSelecionado = 'São Paulo → Minas Gerais'; // Valor padrão
let tipoViagemSelecionado = 'Executiva'; // Valor padrão
let valorPassagem = precos[destinoSelecionado][tipoViagemSelecionado]; // Valor padrão
let valorDespache = 0; 

document.getElementById('tipoPassagemMinas').addEventListener('change', function() {
    destinoSelecionado = 'São Paulo → Minas Gerais';
    tipoViagemSelecionado = this.value;
    valorPassagem = precos[destinoSelecionado][tipoViagemSelecionado]; // Atualiza o valor
    atualizarValorPassagem();
});

document.getElementById('tipoPassagemAcre').addEventListener('change', function() {
    destinoSelecionado = 'Rio de Janeiro → Acre';
    tipoViagemSelecionado = this.value;
    valorPassagem = precos[destinoSelecionado][tipoViagemSelecionado]; // Atualiza o valor
    atualizarValorPassagem();
});

// Função para atualizar o valor total no resumo da compra
function atualizarValorPassagem() {
    document.getElementById('valorPassagem').textContent = `R$ ${valorPassagem}`;
    atualizarValorTotal(); // Atualiza o valor total
}

function atualizarValorTotal() {
    const valorTotal = valorPassagem + valorDespache;
    document.getElementById('valorTotal').textContent = `R$ ${valorTotal}`;
}


let assentosSelecionados = []; // Array para armazenar assentos selecionados

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    // Gerar assentos
    for (let i = 0; i < 25; i++) {
        createSeat(grid, i + 1); // Passa a posição do assento
    }

    // Eventos de despacho e finalização
    setupDespacheModal();
    setupFinalizarModal();
});

function createSeat(grid, position) {
    const seat = document.createElement('div');
    const type = getRandomSeatType();
    seat.classList.add(type, 'vazio');
    seat.innerHTML = `<span>${position}</span><span></span>`; // Exibe a posição do assento
    
    seat.addEventListener('click', () => toggleSeatReservation(seat, position));
    grid.appendChild(seat);
}

function getRandomSeatType() {
    const seatTypes = ['economica', 'premium', 'executiva'];
    return seatTypes[Math.floor(Math.random() * seatTypes.length)];
}

function toggleSeatReservation(seat, position) {
    if (!seat.classList.contains('ocupado')) {
        const resp = confirm('Deseja reservar o assento?');
        if (resp) reserveSeat(seat, position);
    } else {
        const resp = confirm('Deseja cancelar a reserva?');
        if (resp) cancelSeat(seat, position);
    }
}

function reserveSeat(seat, position) {
    seat.classList.replace('vazio', 'ocupado');
    seat.classList.add('assento-reservado'); // Destaca o assento
    assentosSelecionados.push(position); // Armazena a posição do assento
}

function cancelSeat(seat, position) {
    seat.classList.replace('ocupado', 'vazio');
    seat.classList.remove('assento-reservado'); // Remove o destaque
    assentosSelecionados = assentosSelecionados.filter(assento => assento !== position); // Remove a posição do assento
}

// Configuração do modal de despacho
function setupDespacheModal() {
    const modalDespache = document.querySelector('#despache');
    modalDespache.addEventListener('click', () => toggleModal('modal', true));

    document.querySelector('.close-btn').addEventListener('click', () => toggleModal('modal', false));
    document.getElementById('simBtn').addEventListener('click', () => {
        document.getElementById('simContent').style.display = 'block';
    });
    
    document.getElementById('naoBtn').addEventListener('click', () => {
        document.getElementById('simContent').style.display = 'none';
        toggleModal('modal', false);
        document.querySelector('.valorDespache').textContent = 'Valor despache: R$ 0';
    });

    document.getElementById('numBolsas').addEventListener('input', updateDespacheValue);
    document.getElementById('confirmarBtn').addEventListener('click', confirmDespache);
}

// Funções para atualização de despache
function updateDespacheValue() {
    const numBolsas = parseInt(this.value) || 0;
    valorDespache = numBolsas * 100; // Atualiza a variável valorDespache
    document.getElementById('valorDespache').textContent = `${valorDespache}`;
    atualizarValorTotal(); // Atualiza o valor total);
}

function confirmDespache() {
    const valorDespacheTexto = document.getElementById('valorDespache').textContent;
    document.querySelector('.valorDespache').textContent = 'Valor despache: ' + valorDespacheTexto;
    atualizarValorTotal(); // Atualiza o valor total
    toggleModal('modal', false);
}

// Configuração do modal de finalização
function setupFinalizarModal() {
    document.getElementById('finalizarCompra').addEventListener('click', showFinalizarModal);
    document.getElementById('selecionarPagamento').addEventListener('click', showPagamentoModal);
    
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    setupPaymentMethods();
}

function showFinalizarModal() {
    document.getElementById('dataCompra').textContent = new Date().toLocaleDateString();
    document.getElementById('destinoViagem').textContent = destinoSelecionado;
    document.getElementById('tipoViagem').textContent = tipoViagemSelecionado;

    // Exibir horário atual
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    document.getElementById('horario').textContent = `${horas}:${minutos}`;

    // Atualiza valores finais
    document.getElementById('valorPassagem').textContent = `R$ ${valorPassagem}`
    document.getElementById('valorDespacheFinal').textContent = document.querySelector('.valorDespache').textContent;
    document.getElementById('valorTotal').textContent = `R$ ${valorPassagem + valorDespache}`; // Atualiza o valor total

    const checkinAssentosElement = document.getElementById('checkinAssentos');
    if (checkinAssentosElement) {
        checkinAssentosElement.textContent = assentosSelecionados.join(', '); // Exibe todos os assentos selecionados
    }
    toggleModal('modalFinalizar', true);
}

function showPagamentoModal() {
    toggleModal('modalPagamento', true);
    toggleModal('modalFinalizar', false);
}

function setupPaymentMethods() {
    document.getElementById('pagamentoPix').addEventListener('click', () => processPayment('PIX'));
    document.getElementById('pagamentoBoleto').addEventListener('click', () => processPayment('Boleto'));
    document.getElementById('pagamentoCartao').addEventListener('click', () => processPayment('Cartão de Debito'));
    document.getElementById('pagamentoCartao').addEventListener('click', () => processPayment('Cartão de Crédito'));
}

function processPayment(metodo) {
    toggleModal('modalPagamento', false);
    const numeroCheckin = Math.floor(Math.random() * 100000);
    mostrarCheckin("São Paulo", new Date().toLocaleDateString(), numeroCheckin);
}

function mostrarCheckin(destino, data, numero) {
    document.getElementById('checkinDestino').textContent = destinoSelecionado;
    document.getElementById('checkinData').textContent = data;
    document.getElementById('checkinNumero').textContent = numero;
    toggleModal('modalCheckin', true);
}

function resetarInformacoes() {
    assentosSelecionados = [];
    
    document.getElementById('dataCompra').textContent = '';
    document.getElementById('valorDespacheFinal').textContent = '';
    document.querySelector('.valorDespache').textContent = 'Valor despache: R$ 0'; // Resetar o valor de despache
    document.getElementById('checkinAssentos').textContent = '';
    document.getElementById('checkinDestino').textContent = '';
    document.getElementById('checkinData').textContent = '';
    document.getElementById('checkinNumero').textContent = '';

    const assentos = document.querySelectorAll('.grid div');
    assentos.forEach(seat => {
        seat.classList.remove('ocupado', 'assento-reservado');
        seat.classList.add('vazio');
        seat.children[1].textContent = '';
    });

    closeAllModals();
}

// Evento para finalizar o check-in
document.getElementById('finalizarCheckin').addEventListener('click', function() {
    resetarInformacoes();
});

// Função para alternar a visibilidade dos modais
function toggleModal(modalId, show) {
    document.getElementById(modalId).style.display = show ? 'block' : 'none';
}

// Fechar todos os modais
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Evento para abrir o modal de consulta de check-in
document.getElementById('consultarCheckin').addEventListener('click', function() {
    const codigo = document.getElementById('codigoCheckin').value;
    if (codigo) {
        consultarCheckin(codigo);
    } else {
        alert('Por favor, insira um código de check-in.');
    }
});

// Função para consultar check-in
function consultarCheckin(codigo) {
    // Aqui, você deve implementar a lógica para buscar os dados do check-in
    // Para este exemplo, vou usar dados simulados

    // Verifique se o código corresponde ao check-in gerado anteriormente
    if (codigo) { // Simulando que o código sempre será válido
        const destino = destinoSelecionado; // Pega o destino atual
        const data = new Date().toLocaleDateString();

        // Atualiza os dados no modal
        document.getElementById('resultadoDestino').textContent = destino;
        document.getElementById('resultadoData').textContent = data;
        
        // Exibe o resultado
        document.getElementById('resultadoConsulta').style.display = 'block';
    } else {
        alert('Código de check-in inválido.');
    }
}

document.getElementById('consultarCheckinBtn').addEventListener('click', () => {
    toggleModal('modalConsultaCheckin', true);
});

document.addEventListener('DOMContentLoaded', () => {
    // Código que manipula os modais e os eventos

    document.getElementById('consultarCheckin').addEventListener('click', function() {
        const codigo = document.getElementById('codigoCheckin').value;
        if (codigo) {
            consultarCheckin(codigo);
        } else {
            alert('Por favor, insira um código de check-in.');
        }
    });
});
