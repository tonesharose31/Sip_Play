const gameSection = document.querySelector('.game-section');
const resetButton = document.querySelector('#reset-button');
let currentPlayer = 'X';
let gameBoard = Array(9).fill('');

function createGameBoard() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square', 'empty');
    square.addEventListener('click', () => handleSquareClick(square, i));
    gameSection.appendChild(square);
  }
}

function handleSquareClick(square, index) {
  if (square.classList.contains('empty')) {
    square.textContent = currentPlayer;
    square.classList.remove('empty');
    gameBoard[index] = currentPlayer;

    if (checkWinner()) {
      announceWinner();
    } else if (checkTie()) {
      announceTie();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

function checkTie() {
  return gameBoard.every(square => square !== '');
}

function announceWinner() {
  gameSection.removeEventListener('click', handleSquareClick);
  gameSection.textContent = `Player ${currentPlayer} wins!`;
}

function announceTie() {
  gameSection.removeEventListener('click', handleSquareClick);
  gameSection.textContent = "It's a tie!";
}

function resetGame() {
  gameBoard = Array(9).fill('');
  currentPlayer = 'X';
  gameSection.innerHTML = '';
  createGameBoard();
}

resetButton.addEventListener('click', resetGame);

createGameBoard();