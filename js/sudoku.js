function createGrid() {
    const gameContainer = document.querySelector('.sudoku-game');
    gameContainer.innerHTML = ''; // Clear previous grid if any

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (j === 2 || j === 5) {
                cell.classList.add('b-right');
            }

            if (i === 2 || i === 5) {
                cell.classList.add('b-bottom');
            }

            gameContainer.appendChild(cell);
        }
    }
}

function createSudokuBoard() {
    let board = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    return board;
}

function fillGrid(board) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        cell.textContent = board[row][col] || '';
    })
}

function shuffleArray(array) {

    // Fisher-Yates shuffle algorithm
    // starts from the end of the array and swaps each element with a random one before it

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    } return array;
}

function shuffleBoard(board) {

    // ***********************************************
    // shuffle rows and columns of the board to create a new valid Sudoku configuration
    // ***********************************************

    // shuffle rows within the same band (3 row blocks)
    for (let band = 0; band < 3; band++) {
        const rows = [band * 3, band * 3 + 1, band * 3 + 2];
        shuffleArray(rows);
        const temp = board[rows[0]];
        board[rows[0]] = board[rows[1]];
        board[rows[1]] = board[rows[2]];
        board[rows[2]] = temp;
    }

    // shuffle columns within the same stack (3 column blocks)
    for (let stack = 0; stack < 3; stack++) {
        const cols = [stack * 3, stack * 3 + 1, stack * 3 + 2];
        shuffleArray(cols);
        for (let i = 0; i < 9; i++) {
            const temp = board[i][cols[0]];
            board[i][cols[0]] = board[i][cols[1]];
            board[i][cols[1]] = board[i][cols[2]];
            board[i][cols[2]] = temp;
        }
    }

    // relabel numbers randomly
    const numMap = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = numMap[board[i][j] - 1];
        }
    }

    return board;
}

function removeCells(board, difficulty) {

    let cellsToRemove;

    switch (difficulty) {
        case 'easy':
            cellsToRemove = 30;
            break;
        case 'medium':
            cellsToRemove = 40;
            break;
        case 'hard':
            cellsToRemove = 50;
            break;
    }

    // Remove cells from the board
    let removed = 0;
    while (removed < cellsToRemove) {
        const i = Math.floor(Math.random() * 9);
        const j = Math.floor(Math.random() * 9);
        if (board[i][j] !== 0) {
            board[i][j] = 0;
            removed++;
        }
    }

    return board;
}

function generateSudokuGame(difficulty) {
    createGrid();
    let board = createSudokuBoard();
    board = shuffleBoard(board);
    board = removeCells(board, difficulty); // You can change the difficulty here
    fillGrid(board);
}

const difficultyButtons = document.querySelectorAll('#easy, #medium, #hard, #expert');
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const difficulty = button.id;
        generateSudokuGame(difficulty);
    });
});


