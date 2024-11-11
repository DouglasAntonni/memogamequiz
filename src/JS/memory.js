const plantasFotos = [
    "src/images/plants/plant1.png", "src/images/plants/plant2.png",
    "src/images/plants/plant3.png", "src/images/plants/plant4.png",
    "src/images/plants/plant5.png", "src/images/plants/plant6.png",
    "src/images/plants/plant7.png", "src/images/plants/plant8.png",
    "src/images/plants/plant1.png", "src/images/plants/plant2.png",
    "src/images/plants/plant3.png", "src/images/plants/plant4.png",
    "src/images/plants/plant5.png", "src/images/plants/plant6.png",
    "src/images/plants/plant7.png", "src/images/plants/plant8.png"
];

let totalAttempts = 0;
let openCards = [];
let matchedCards = [];
let attempts = 0;
let timeLeft = 60;
let timer;

// Função para mostrar a imagem da carta
function mostrarImagemCarta(caminhoImagem) {
    return `<img src="${caminhoImagem}" alt="Imagem da carta" class="imagem-carta">`;
}

// Configura o jogo com as imagens das plantas
function setupGame() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ""; // Limpa o jogo anterior
    const shuffledFotos = plantasFotos.slice().sort(() => Math.random() - 0.5);
    
    shuffledFotos.forEach((foto, index) => {
        const box = document.createElement("div");
        box.classList.add("item");
        box.dataset.foto = foto;
        box.dataset.index = index;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    });
}

// Lida com o clique nas cartas
function handleClick() {
    if (openCards.length < 2 && !this.classList.contains('boxOpen')) {
        this.classList.add('boxOpen');
        this.innerHTML = mostrarImagemCarta(this.dataset.foto);
        openCards.push(this);
    }
    if (openCards.length === 2) {
        attempts++;
        document.getElementById("attempts").innerText = attempts;
        setTimeout(checkMatch, 500);
    }
}

// Verifica se as cartas são correspondentes
function checkMatch() {
    const [card1, card2] = openCards;
    if (card1.dataset.foto === card2.dataset.foto) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        // Verifica se o jogador completou o jogo
        if (matchedCards.length === plantasFotos.length) {
            clearInterval(timer);
            alert(`Parabéns! Você completou o jogo das plantas medicinais em ${attempts} tentativas! A vida é melhor com escolhas saudáveis.`);
            window.location.href = "jigsaw.html"; // Redireciona para o quebra-cabeça
        }
    } else {
        // Caso não seja uma correspondência
        card1.classList.remove('boxOpen');
        card2.classList.remove('boxOpen');
        card1.innerHTML = "";
        card2.innerHTML = "";
    }
    openCards = [];
}

// Inicia o cronômetro
function startTimer() {
    timer = setInterval(() => {
        document.getElementById("time").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Game Over! O tempo acabou!");
            resetGame();
        }
        timeLeft--;
    }, 1000);
}

// Reseta o jogo
function resetGame() {
    timeLeft = 60;
    attempts = 0;
    openCards = [];
    matchedCards = [];
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("attempts").innerText = attempts;
    clearInterval(timer);
    setupGame();
    startTimer();
}

// Inicia o jogo quando a página é carregada
window.onload = () => {
    setupGame();
    startTimer();
};
