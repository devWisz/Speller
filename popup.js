const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let aiMode = false;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

document.getElementById("human").onclick = () => startGame(false);
document.getElementById("ai").onclick = () => startGame(true);
document.getElementById("restart").onclick = () => startGame(aiMode);

function startGame(ai) {
  board = Array(9).fill("");
  boardEl.innerHTML = "";
  currentPlayer = "X";
  gameOver = false;
  aiMode = ai;
  statusEl.textContent = "Player X turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => handleMove(i, cell);
    boardEl.appendChild(cell);
  }
}

function handleMove(i, cell) {
  if (board[i] || gameOver) return;

  board[i] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusEl.textContent = `${currentPlayer} Wins!`;
    gameOver = true;
    highlightWin();
    return;
  }

  if (board.every(c => c)) {
    statusEl.textContent = "Draw!";
    gameOver = true;
    return;
  }

  