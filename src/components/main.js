import { createDiv, createPara, createSVG, createImage } from "../utils/utils.js";
import back from "../assets/images/arrow.png";
import destroyerShip from "../assets/images/ship2.png";
// import destroyerShip from "../assets/images/ship2.png"
// import destroyerShip from "../assets/images/ship2.png"
// import destroyerShip from "../assets/images/ship2.png"
// import destroyerShip from "../assets/images/ship2.png"


export default function main() {
    
    const getContainer = document.querySelector(".container");
    const getMainContent = createDiv(getContainer,"mainContent");
    const getStartBtn = document.querySelector(".start-btn");
    
    const getBackBtn = createDiv(getMainContent,"main-back-btn");
    const getMainBackBtn = createImage(getBackBtn,back,"main-back-img");

    
    getStartBtn.addEventListener("click",()=>{
        getMainContent.classList.add("show");
    })
    getMainBackBtn.addEventListener("click",()=>{
        document.querySelector(".menu").classList.remove("hide");
        document.querySelector(".ships-container").classList.remove("hide");
        getMainContent.classList.remove("show");
    })

    initialize_player_selection_board(getMainContent);

}



function initialize_player_selection_board(getMainContent){

    const getBoardsContainer = createDiv(getMainContent,"strategy-board-container"); 
    const getPlayerBoard = createDiv(getBoardsContainer,"playerBoard");
    const rows = 10;
    const cols = 10;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.occupied = false;
            highlightCells(cell,rows,cols);
            getPlayerBoard.appendChild(cell);
        }
    }

    const getShipSelectionBorad = createDiv(getBoardsContainer,"ships-selection");
    const destShip = createImage(getShipSelectionBorad,destroyerShip,"destroyer-ship");
    destShip.draggable = true;
    destShip.id = "destroyer-ship-img";
    destShip.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        destShip.draggable = false;
    });
}


function highlightCells(cell,rows,cols){

    cell.addEventListener("dragover", (e) => {
        e.preventDefault();
        document.querySelectorAll(".cell.highlight").forEach(c => c.classList.remove("highlight"));

        const startRow = parseInt(cell.dataset.row);
        const startCol = parseInt(cell.dataset.col);
        
        // Highlight horizontally
        for (let i = 0; i < 4; i++) {
            const targetCol = startCol + i;
            if (targetCol >= cols) break; // prevent overflow

            // ✅ find the correct cell using row + col
            const targetCell = document.querySelector(
            `.cell[data-row='${startRow}'][data-col='${targetCol}']`
            );
            if (targetCell) targetCell.classList.add("highlight");
        }
    });

    cell.addEventListener("dragleave", () => {
        cell.classList.remove("highlight");
    });
}

function initialize_player_board2(getMainContent){
    const getBoardsContainer = createDiv(getMainContent,"strategy-board-container"); 
    const getPlayerBoard = createDiv(getBoardsContainer,"playerBoard");
    const rows = 10;
    const cols = 10;
    const destShipLength = 4; // adjust based on your ship
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            cell.addEventListener("drop", (e) => {
                e.preventDefault();
                document.querySelectorAll(".cell.highlight").forEach(c => c.classList.remove("highlight"));

                const draggedId = e.dataTransfer.getData("text/plain");
                const draggedElement = document.getElementById(draggedId);
                const orientation = "horizontal"; // or vertical
              
                // get cell coordinates
                const startRow = parseInt(cell.dataset.row);
                const startCol = parseInt(cell.dataset.col);
              
                if (orientation === "horizontal" && startCol + destShipLength > cols ) {
                    console.log("❌ Out of bounds horizontally");
                    return;
                }

                // calculate position
                const x = cell.offsetLeft;
                const y = cell.offsetTop;
                const cellWidth = cell.offsetWidth;
                const cellHeight = cell.offsetHeight;
              
                // set position and size
                draggedElement.style.position = "absolute";
                draggedElement.style.left = `${x}px`;
                draggedElement.style.top = `${y}px`;
              
                if (orientation === "horizontal") {
                  draggedElement.style.width = `${destShipLength * cellWidth}px`;
                  draggedElement.style.height = `${cellHeight}px`;
                } else {
                  draggedElement.style.width = `${cellWidth}px`;
                  draggedElement.style.height = `${destShipLength * cellHeight}px`;
                }
                // append to the grid container
                // const grid = document.querySelector(".grid");
                // grid.appendChild(draggedElement);
            });     
            getPlayerBoard.appendChild(cell); // add cell to board
        }
    }



    
}