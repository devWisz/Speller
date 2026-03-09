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

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer} turn`;

  if (aiMode && currentPlayer === "O") {
    setTimeout(aiMove, 300);
  }
}

function aiMove() {
  let bestScore = -Infinity;
  let move;

  board.forEach((cell, i) => {
    if (!cell) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });

  const cell = boardEl.children[move];
  handleMove(move, cell);
}

function minimax(b, depth, isMax) {
  if (checkWinner("O")) return 10 - depth;
  if (checkWinner("X")) return depth - 10;
  if (b.every(c => c)) return 0;

  if (isMax) {
    let best = -Infinity;
    b.forEach((c, i) => {
      if (!c) {
        b[i] = "O";
        best = Math.max(best, minimax(b, depth + 1, false));
        b[i] = "";
      }
    });
    return best;
  } else {
    let best = Infinity;
    b.forEach((c, i) => {
      if (!c) {
        b[i] = "X";
        best = Math.min(best, minimax(b, depth + 1, true));
        b[i] = "";
      }
    });
    return best;
  }
}

function checkWin(player) {
  return winPatterns.some(p =>
    p.every(i => board[i] === player)
  );
}

function checkWinner(player) {
  return winPatterns.some(p =>
    p.every(i => board[i] === player)
  );
}

function highlightWin() {
  winPatterns.forEach(p => {
    if (p.every(i => board[i] === currentPlayer)) {
      p.forEach(i => boardEl.children[i].classList.add("win"));
    }
  });
} 