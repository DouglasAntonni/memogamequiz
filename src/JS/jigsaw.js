const imagemPuzzle = "src/images/puzzle/puzzle1.jpeg";
let tiles = [];
let moveCount = 0;
let isWin = false;
let draggingTile = null;
let originalX, originalY;


function criarPuzzle() {
    const puzzle = document.getElementById('puzzle');
    puzzle.innerHTML = '';
    tiles = [];
    moveCount = 0;
    document.getElementById('moveCount').textContent = moveCount;
    
    // Criar placeholders
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'tile-placeholder';
            placeholder.style.left = (x * 100) + 'px';
            placeholder.style.top = (y * 100) + 'px';
            puzzle.appendChild(placeholder);
        }
    }
    
    // Criar peças móveis
    for (let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        
        const x = i % 4;
        const y = Math.floor(i / 4);
        
        posicionarTile(tile, x, y);
        
        // Definir background para cada peça
        tile.style.backgroundImage = `url(${imagemPuzzle})`;
        tile.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
        
        configurarDrag(tile);
        puzzle.appendChild(tile);
        
        tiles.push({
            element: tile,
            x: x,
            y: y,
            correctX: x,
            correctY: y,
            value: i + 1,
            isCorrect: false
        });
    }
}

function configurarDrag(tile) {
    tile.draggable = true;
    
    tile.addEventListener('dragstart', (e) => {
        if (isWin) return; // Impede interações após vitória
        draggingTile = tile;
        const tileObj = tiles.find(t => t.element === tile);
        
        if (tileObj.isCorrect) {
            // Impede o arrasto se a peça estiver na posição correta
            e.preventDefault();
            return;
        }
        
        originalX = tileObj.x;
        originalY = tileObj.y;
        tile.classList.add('dragging');
        e.dataTransfer.setData('text/plain', '');
    });
    
    tile.addEventListener('dragend', () => {
        tile.classList.remove('dragging');
        verificarPosicao(tile);
        verificarVitoria();
    });
    
    tile.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    tile.addEventListener('drop', (e) => {
        if (isWin) return; // Impede interações após vitória
        e.preventDefault();
        const tileObj = tiles.find(t => t.element === tile);
        
        // Impede a troca se a peça de destino estiver na posição correta
        if (draggingTile && draggingTile !== tile && !tileObj.isCorrect) {
            trocarPosicoes(draggingTile, tile);
        }
    });
}

function trocarPosicoes(tile1, tile2) {
    const tile1Obj = tiles.find(t => t.element === tile1);
    const tile2Obj = tiles.find(t => t.element === tile2);
    
    const tempX = tile1Obj.x;
    const tempY = tile1Obj.y;
    
    posicionarTile(tile1, tile2Obj.x, tile2Obj.y);
    posicionarTile(tile2, tempX, tempY);
    
    tile1Obj.x = tile2Obj.x;
    tile1Obj.y = tile2Obj.y;
    tile2Obj.x = tempX;
    tile2Obj.y = tempY;
    
    moveCount++;
    document.getElementById('moveCount').textContent = moveCount;
}

function posicionarTile(tile, x, y) {
    tile.style.left = (x * 100) + 'px';
    tile.style.top = (y * 100) + 'px';
}

function verificarPosicao(tile) {
    const tileObj = tiles.find(t => t.element === tile);
    if (tileObj.x === tileObj.correctX && tileObj.y === tileObj.correctY) {
        // Marca a peça como correta
        tileObj.isCorrect = true;
        tile.classList.add('correct-position'); // Adiciona a classe para cor verde
        tile.draggable = false; // Torna a peça imutável
    } else {
        tileObj.isCorrect = false;
        tile.classList.remove('correct-position');
        tile.draggable = true;
    }
}

function verificarVitoria() {
    if (isWin) return; // Impede múltiplas checagens de vitória

    const vitoria = tiles.every(tile => tile.isCorrect);
    
    if (vitoria) {
        isWin = true;
        setTimeout(() => {
            alert(`Parabéns! Você venceu em ${moveCount} movimentos! Agora você será redirecionado para o quiz.`);
            window.location.href = "quiz.html"; // Altere "quiz.html" para o caminho da página do seu quiz
        }, 300);
    }
}

function embaralhar() {
    for (let i = 0; i < 100; i++) {
        const tile1 = tiles[Math.floor(Math.random() * tiles.length)];
        const tile2 = tiles[Math.floor(Math.random() * tiles.length)];
        
        if (tile1 !== tile2 && !tile1.isCorrect && !tile2.isCorrect) {
            trocarPosicoes(tile1.element, tile2.element);
        }
    }
    
    moveCount = 0;
    document.getElementById('moveCount').textContent = moveCount;
    isWin = false;
}

function novoJogo() {
    isWin = false;
    criarPuzzle();
    embaralhar();
}

novoJogo();
