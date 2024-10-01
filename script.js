const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let scores = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.every(cell => cell) ? 'Tie' : null;
};

const updateScore = (winner) => {
    if (winner === 'X') {
        scores.X++;
        scoreX.textContent = scores.X;
    } else if (winner === 'O') {
        scores.O++;
        scoreO.textContent = scores.O;
    }
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (!board[index] && !checkWinner()) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => alert(winner === 'Tie' ? 'Empate!' : `Jogador ${winner} ganhou!`), 100);
            if (winner !== 'Tie') {
                updateScore(winner);
            }
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);