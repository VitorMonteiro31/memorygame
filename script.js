const cardsArray = [
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' },
    { name: 'I', value: 'I' },
    { name: 'J', value: 'J' },
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' },
    { name: 'I', value: 'I' },
    { name: 'J', value: 'J' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;
const totalPairs = cardsArray.length / 2;

const attemptsDisplay = document.getElementById('attempts');
const winScreen = document.getElementById('win-screen');
const restartButton = document.getElementById('restart-btn');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpar o tabuleiro ao reiniciar o jogo
    shuffle(cardsArray);

    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Resetar as variáveis de estado do jogo
    attempts = 0;
    matchedPairs = 0;
    attemptsDisplay.textContent = 'Tentativas: 0';
    winScreen.classList.add('hidden');
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.name;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        matchedPairs++;

        // Checar se todos os pares foram combinados
        if (matchedPairs === totalPairs) {
            setTimeout(showWinScreen, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showWinScreen() {
    winScreen.classList.remove('hidden');
}

restartButton.addEventListener('click', createBoard);

// Inicializar o jogo
createBoard();
