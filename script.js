const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let cells = Array(9).fill('');
let gameActive = true;

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Current Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  currentPlayer = 'X';
  cells = Array(9).fill('');
  gameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
  drawBoard();
}

drawBoard();
