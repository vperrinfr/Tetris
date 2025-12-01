// Game constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    null,
    '#FF0D72', // I
    '#0DC2FF', // J
    '#0DFF72', // L
    '#F538FF', // O
    '#FF8E0D', // S
    '#FFE138', // T
    '#3877FF'  // Z
];

// Tetromino shapes
const SHAPES = [
    [], // Empty
    [[1,1,1,1]], // I
    [[2,0,0],[2,2,2]], // J
    [[0,0,3],[3,3,3]], // L
    [[4,4],[4,4]], // O
    [[0,5,5],[5,5,0]], // S
    [[0,6,0],[6,6,6]], // T
    [[7,7,0],[0,7,7]]  // Z
];

// Game state
let canvas, ctx, nextCanvas, nextCtx;
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let lines = 0;
let gameRunning = false;
let gamePaused = false;
let dropInterval = 1000;
let lastDropTime = 0;

// Initialize game
function init() {
    canvas = document.getElementById('game-board');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('next-piece');
    nextCtx = nextCanvas.getContext('2d');
    
    // Create empty board
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    
    // Event listeners
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.addEventListener('keydown', handleKeyPress);
    
    drawBoard();
    drawNextPiece();
}

// Start game
function startGame() {
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    lines = 0;
    gameRunning = true;
    gamePaused = false;
    dropInterval = 1000;
    
    updateScore();
    document.getElementById('start-btn').classList.add('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    document.getElementById('game-over').classList.add('hidden');
    
    nextPiece = createPiece();
    spawnPiece();
    lastDropTime = Date.now();
    gameLoop();
}

// Toggle pause
function togglePause() {
    if (!gameRunning) return;
    gamePaused = !gamePaused;
    document.getElementById('pause-btn').textContent = gamePaused ? 'Resume' : 'Pause';
    if (!gamePaused) {
        lastDropTime = Date.now();
        gameLoop();
    }
}

// Restart game
function restartGame() {
    startGame();
}

// Create random piece
function createPiece() {
    const shapeIndex = Math.floor(Math.random() * 7) + 1;
    return {
        shape: SHAPES[shapeIndex],
        color: shapeIndex,
        x: Math.floor(COLS / 2) - Math.floor(SHAPES[shapeIndex][0].length / 2),
        y: 0
    };
}

// Spawn new piece
function spawnPiece() {
    currentPiece = nextPiece;
    nextPiece = createPiece();
    drawNextPiece();
    
    if (collision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
        gameOver();
    }
}

// Check collision
function collision(x, y, shape) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;
                
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }
                
                if (newY >= 0 && board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Rotate piece
function rotate(shape) {
    const newShape = shape[0].map((_, i) => 
        shape.map(row => row[i]).reverse()
    );
    return newShape;
}

// Move piece
function movePiece(dx, dy) {
    if (!currentPiece || gamePaused) return;
    
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    
    if (!collision(newX, newY, currentPiece.shape)) {
        currentPiece.x = newX;
        currentPiece.y = newY;
        return true;
    }
    return false;
}

// Rotate current piece
function rotatePiece() {
    if (!currentPiece || gamePaused) return;
    
    const rotated = rotate(currentPiece.shape);
    if (!collision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
    }
}

// Hard drop
function hardDrop() {
    if (!currentPiece || gamePaused) return;
    
    while (movePiece(0, 1)) {
        score += 2;
    }
    lockPiece();
    updateScore();
}

// Lock piece to board
function lockPiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const y = currentPiece.y + row;
                const x = currentPiece.x + col;
                if (y >= 0) {
                    board[y][x] = currentPiece.color;
                }
            }
        }
    }
    
    clearLines();
    spawnPiece();
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            row++; // Check same row again
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += [0, 100, 300, 500, 800][linesCleared] * level;
        level = Math.floor(lines / 10) + 1;
        dropInterval = Math.max(100, 1000 - (level - 1) * 100);
        updateScore();
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lines').textContent = lines;
}

// Game over
function gameOver() {
    gameRunning = false;
    gamePaused = false;
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('start-btn').classList.remove('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
}

// Handle keyboard input
function handleKeyPress(e) {
    if (!gameRunning || gamePaused) {
        if (e.key === 'p' || e.key === 'P') {
            togglePause();
        }
        return;
    }
    
    switch(e.key) {
        case 'ArrowLeft':
            movePiece(-1, 0);
            break;
        case 'ArrowRight':
            movePiece(1, 0);
            break;
        case 'ArrowDown':
            if (movePiece(0, 1)) {
                score += 1;
                updateScore();
            }
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case ' ':
            e.preventDefault();
            hardDrop();
            break;
        case 'p':
        case 'P':
            togglePause();
            break;
    }
    
    drawBoard();
}

// Game loop
function gameLoop() {
    if (!gameRunning || gamePaused) return;
    
    const now = Date.now();
    const delta = now - lastDropTime;
    
    if (delta > dropInterval) {
        if (!movePiece(0, 1)) {
            lockPiece();
        }
        lastDropTime = now;
    }
    
    drawBoard();
    requestAnimationFrame(gameLoop);
}

// Draw board
function drawBoard() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let row = 0; row <= ROWS; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, row * BLOCK_SIZE);
        ctx.stroke();
    }
    for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        ctx.moveTo(col * BLOCK_SIZE, 0);
        ctx.lineTo(col * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx.stroke();
    }
    
    // Draw locked pieces
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                drawBlock(ctx, col, row, COLORS[board[row][col]]);
            }
        }
    }
    
    // Draw current piece
    if (currentPiece) {
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    drawBlock(ctx, currentPiece.x + col, currentPiece.y + row, 
                             COLORS[currentPiece.color]);
                }
            }
        }
    }
}

// Draw next piece
function drawNextPiece() {
    nextCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        const offsetX = (nextCanvas.width - nextPiece.shape[0].length * BLOCK_SIZE) / 2;
        const offsetY = (nextCanvas.height - nextPiece.shape.length * BLOCK_SIZE) / 2;
        
        for (let row = 0; row < nextPiece.shape.length; row++) {
            for (let col = 0; col < nextPiece.shape[row].length; col++) {
                if (nextPiece.shape[row][col]) {
                    const x = offsetX + col * BLOCK_SIZE;
                    const y = offsetY + row * BLOCK_SIZE;
                    
                    nextCtx.fillStyle = COLORS[nextPiece.color];
                    nextCtx.fillRect(x, y, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
                    
                    // Add shine effect
                    nextCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    nextCtx.fillRect(x, y, BLOCK_SIZE - 2, (BLOCK_SIZE - 2) / 2);
                }
            }
        }
    }
}

// Draw single block
function drawBlock(context, x, y, color) {
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;
    
    // Main block
    context.fillStyle = color;
    context.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    
    // Shine effect
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, (BLOCK_SIZE - 2) / 2);
    
    // Border
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.lineWidth = 2;
    context.strokeRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
}

// Initialize when page loads
window.addEventListener('load', init);

// Made with Bob
