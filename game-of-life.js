// game-of-life.js
document.addEventListener('DOMContentLoaded', function () {
    const leftMargin = document.getElementById('left-margin');
    const rightMargin = document.getElementById('right-margin');
    const cellSize = 10;
    const numRows = Math.floor(window.innerHeight / cellSize);
    const numCols = 2; // Adjust as needed

    let gridLeft = createEmptyGrid(numRows, numCols);
    let gridRight = createEmptyGrid(numRows, numCols);

    function createCell(container, row, col) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        container.appendChild(cell);
        return { cell, row, col };
    }

    function createEmptyGrid(rows, cols) {
        return Array.from({ length: rows }, () => Array(cols).fill(false));
    }

    function updateGameOfLife(grid, container) {
        const newGrid = createEmptyGrid(grid.length, grid[0].length);

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                const neighbors = countNeighbors(grid, row, col);

                if (grid[row][col]) {
                    // Cell is alive
                    newGrid[row][col] = neighbors === 2 || neighbors === 3;
                } else {
                    // Cell is dead
                    newGrid[row][col] = neighbors === 3;
                }

                const cell = createCell(container, row, col);
                cell.cell.style.backgroundColor = newGrid[row][col] ? '#3498db' : ''; // Adjust color
            }
        }

        return newGrid;
    }

    function countNeighbors(grid, row, col) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        return directions.reduce((count, [dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
                return count + (grid[newRow][newCol] ? 1 : 0);
            }

            return count;
        }, 0);
    }

    // Set up initial cells
    for (let i = 0; i < numRows; i++) {
        createCell(leftMargin, i, 0);
        createCell(rightMargin, i, 0);
    }

    // You can use setInterval to update the simulation periodically
    setInterval(function () {
        gridLeft = updateGameOfLife(gridLeft, leftMargin);
        gridRight = updateGameOfLife(gridRight, rightMargin);
    }, 100);
});
