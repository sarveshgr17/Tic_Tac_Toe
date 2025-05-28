const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winningMessage');
const winningMessageText = document.getElementById('winningMessageText');
const restartButton = document.getElementById('restartButton');

let oTurn;
let gameOver = false;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  gameOver = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.innerText = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessage.classList.remove('show');
}

function handleClick(e) {
  if (gameOver) return;  // Block clicks after game ends

  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index =>
      cellElements[index].classList.contains(currentClass)
    )
  );
}

function isDraw() {
  return [...cellElements].every(cell =>
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

function endGame(draw) {
  gameOver = true;  // ✅ Prevent future clicks
  if (draw) {
    winningMessageText.innerText = 'Draw!';
  } else {
    winningMessageText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessage.classList.add('show');
}
