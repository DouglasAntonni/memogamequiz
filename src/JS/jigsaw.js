const plants = {
    X: {
        name: 'Comida Saldável',
        img: 'src/images/Garden/img2.png'
    },
    O: {
        name: 'Medicamentos',
        img: 'src/images/Garden/img1.png'
    }
};

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function minimax(board, depth, isMaximizing) {
    const scores = {
        O: 10,
        X: -10,
        tie: 0
    };

    const result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        if (board[combination[0]] &&
            board[combination[0]] === board[combination[1]] &&
            board[combination[0]] === board[combination[2]]) {
            return board[combination[0]];
        }
    }
    if (board.includes('')) return null;
    return 'tie';
}

function computerMove() {
    if (!gameActive) return;
    
    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            const score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    
    makeMove(bestMove);
}

function makeMove(index) {
    board[index] = currentPlayer;
    createBoard();
    
    if (checkWin()) {
        gameActive = false;
        
        document.getElementById('status').textContent = 
        `${plants[currentPlayer].name} venceu! 🎉`;
        
            return;
    }
    
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        
        document.getElementById('status').textContent = 'Empate! 🤝';
        setTimeout(() => {
            resetGame();
        }, 2000);
        
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = 
        `Vez da ${plants[currentPlayer].name}`;
        
    if (currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
    }
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    
    board.forEach((cell, index) => {
        const cellElement = document.createElement('button');
        cellElement.className = 'cell';
        cellElement.setAttribute('data-index', index);
        
        if (cell) {
            const img = document.createElement('img');
            img.src = plants[cell].img;
            img.alt = plants[cell].name;
            cellElement.appendChild(img);
        }
        
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== '' || currentPlayer === 'O') return;
    makeMove(index);
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = 
        `Vez da ${plants[currentPlayer].name}`;
    createBoard();
}

document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('quizButton').addEventListener('click', function() {
    window.location.href = "quiz.html";
});



createBoard();