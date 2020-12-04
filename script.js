

const orientations = [
    [-1, 0], [-1, 1],[0, 1],[1, 1],
    [1, 0],[1, -1],[0, -1],[-1, -1]
];


class Game {

    constructor(rowSize, colSize, ratio){
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.ratio = ratio;
        let cells = [];
        for (let i = 0; i < this.rowSize; i++) {
            let row = [];
            for (let j = 0; j < this.colSize; j++) {
                row.push({
                    el: null,
                    value: null,
                });
            }
            cells.push(row);
        }
        this.cells = cells;
    }

    shuffle() {
        let mines = [];
        for (let i = 0; i < this.rowSize; i++) {
            for (let j = 0; j < this.colSize; j++) {
                let cell= this.cells[i][j];
                if (Math.random() <= this.ratio){
                    cell.value = -1;
                    mines.push([i,j]);
                } else {
                    cell.value = 0;
                }
            }
        }
    }

    for (let [i0, j0] of mines) {
        for (let [rowOffset, colOffset] of orientations) {
            let i1 = i0 + rowOffset, j1 = j0 + colOffset;
            if (i1 < 0 || i1 >= this.rowSize || j1 < 0 
                || j1 >= this.cplSize) {
                continue;
            }

            let cell = this.cells[i1][j1];
            if (cell.value === "-1") {
                continue;
            }

            cell.value += 1;
        }

    }

    getCellValue(row, col){
        return this.cells[row][col].value
    }

    getCellValue(row, col) {
        return this.cells[row][col].el;
    }
    
    setCellElement(row, col) {
        return this.cells[row][col].el = element;
    }

}

function renderTable() {

    let gameEl = document.querySelector("#game");
    gameEl.innerHTML = "";

    let boardEl = document.createElement("div");
    boardEl.className = "game-borad";
    
    let headerEl = document.createElement("div");
    headerEl.className = "header";
    let tableEl = document.createElement("table");
    boardEl.append(headerEl);
    boardEl.append(tableEl);
    
    gameEl.append(boardEl);
    

    // let tableEl = document.querySelector(".fame-borad table");

    let game = new Game(16, 30, 0.15);
    game.shuffle();

    for (let i = 0; i < game.rowSize; i++) {
        let rowEl = document.createElement("tr");
        for (let j = 0; j < game.colSize; j++) {
            let tdEl = document.createElement("td");
            let cellEl = document.createElement("div");
            cellEl.className = "cell";

            let value = game.getCellValue(i, j);
            if (value === -1) {
                cellEl.innerText = "*";
            } else if (value >= 1){
                cellEl.innerText = value;
            }

            game.setCellElement(i, j, cellEl)
           
            cellEl.onclick = (e) => {
                handleClearAction(i, j, game, cellEl, tableEl);
            }

            tdEl.append(cellEl);
            rowEl.append(tdEl);
        }

        tableEl.append(rowEl);
    }
}
    
function handleClearAction(row, col, game, cellEl, tableEl){
    let value = game.getCellValue(row, col);
    if (value === -1){
        cellEl.classList.add("exploded");
        tableEl.classList.add("exploded");
                    return;
                }

                if (value === 0){
                    clearCells(row, col, game, {});
                } else { 
                    cellEl.classList.add("clear");
                }
}   


function clearCells(row, col, cells, game, cleared) {

    cleared[`${row},${col}`] = true;

    game.getCellElement(row,col).classList.add("clear");


    for (let [rowOffset, colOffset] of orientations) {
        let i1 = row + rowOffset, j1 = col + colOffset;
        if (i1 < 0 || i1 >= game.rowSize || j1 < 0 || j1 >= game.colSize) {
            continue;
        }

        let value = game.getCellValue(i1, j1);

        if (value === -1) {
            continue;
        }

        if (value >= 1) {
            game.getCellElement(i1,j1).el.classList.add("clear");
            continue;
        }

        if (cleared[`${i1},${j1}`]) {
            continue;
        }

        clearCells(i1, j1, game, cleared);
    }
     
}


function renderWelcome() {
   
    let gameEl = document.querySelector("#game");
    gameEl.innerHTMLL = `
    <div class="welcome">
        <button id="advance"> 高级</button>
    </div>
    `;

    let buttonEl = gameEl.querySelector("button#advance");
    buttonEl.onclick = () => {
        renderTable();

    }
}

// renderTable();

renderWelcome();