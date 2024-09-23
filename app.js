/* Hamburger funcionalidade  */
const botao = document.querySelector('.menu__botao');
const navList = document.querySelector('.menu__lista')
const menuNav = document.querySelector('.menu');

botao.addEventListener('click', () => {
    menuNav.classList.toggle('menu-active');
    navList.style.display = ('flex');
});

navList.addEventListener('click', () =>{
    navList.style.display = ('none');
})


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const seatTypes = ['economica', 'premium', 'executiva'];
    
    // Gerar assentos
    for (let i = 0; i < 25; i++) {
        const seat = document.createElement('div');
        const type = seatTypes[Math.floor(Math.random() * seatTypes.length)];
        seat.classList.add(type);
        seat.classList.add('vazio');
        seat.innerHTML = `<span></span><span></span>`;
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('ocupado')) {
                const resp = confirm('Deseja reservar o assento?');
                if (resp) {
                    const nome = prompt("Digite o nome:");
                    if (nome && nome.length > 3) {
                        seat.children[1].innerHTML = nome;
                        seat.classList.remove('vazio');
                        seat.classList.add('ocupado');
                    }
                }
            } else {
                const resp = confirm('Deseja cancelar a reserva?');
                if (resp) {
                    seat.classList.remove('ocupado');
                    seat.classList.add('vazio');
                    seat.children[1].innerHTML = "";
                }
            }
        });
        grid.appendChild(seat);
    }
});

document.getElementById('sac-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        alert('Sua mensagem foi enviada com sucesso!');
        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

const modalDespache = document.querySelector('#despache');

modalDespache.addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('simBtn').addEventListener('click', function() {
    document.getElementById('simContent').style.display = 'block';
});

document.getElementById('naoBtn').addEventListener('click', function() {
    document.getElementById('simContent').style.display = 'none';
});

document.getElementById('numBolsas').addEventListener('input', function() {
    const numBolsas = parseInt(this.value) || 0;
    const valorDespache = numBolsas * 100;
    document.getElementById('valorDespache').textContent = valorDespache;
    valorDespache = document.getElementById('valorDespache').innerText;
    document.querySelector('.valorDespache').innerText = `Valor despache: R$${valorDespache}`;
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

