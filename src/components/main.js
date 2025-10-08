import { createDiv, createPara, createSVG, createImage } from "../utils/utils.js";
import back from "../assets/images/arrow.png";
import battleShipPic from "../assets/images/battleship.png";
import carrierShipPic from "../assets/images/carrier.png";
import cruiserShipPic from "../assets/images/cruiser.png";
import submarineShipPic from "../assets/images/submarine.png";
import destroyerShipPic from "../assets/images/destroyer.png";



export default function main() {
    
    const getContainer = document.querySelector(".container");
    const getMainContent = createDiv(getContainer,"mainContent");
    const getStartBtn = document.querySelector(".start-btn");
    
    const getBackBtn = createDiv(getMainContent,"main-back-btn");
    const getMainBackBtn = createImage(getBackBtn,back,"main-back-img");
    
    getStartBtn.addEventListener("click",()=>{
        getMainContent.classList.add("show");
    });
    getMainBackBtn.addEventListener("click",()=>{
        document.querySelector(".menu").classList.remove("hide");
        document.querySelector(".ships-container").classList.remove("hide");
        getMainContent.classList.remove("show");
    });

    const getMainContainer = createDiv(getMainContent,"main-container"); 

    const getAxisContainer = createDiv(getMainContainer,"axis-container");
    const getXAxisContainer = createDiv(getAxisContainer,"Xaxis-container");
    const getYAxisContainer = createDiv(getAxisContainer,"Yaxis-container");

    const getBoardsContainer = createDiv(getMainContainer,"strategy-board-container"); 
    createDiv(getBoardsContainer,"playerBoard");

    const getShipSelectionBorad = createDiv(getBoardsContainer,"ships-selection");
    const carrierShip = createImage(getShipSelectionBorad,carrierShipPic,"carrier-ship");
    const battleShip = createImage(getShipSelectionBorad,battleShipPic,"battle-ship");
    const cruiserShip = createImage(getShipSelectionBorad,cruiserShipPic,"cruiser-ship");
    const submarineShip = createImage(getShipSelectionBorad,submarineShipPic,"submarine-ship");
    const destroyerShip = createImage(getShipSelectionBorad,destroyerShipPic,"destroyer-ship");

    const getResetStartContainer = createDiv(getMainContainer,"reset-start-container");
    const getStartContainer = createDiv(getAxisContainer,"start-container");
    const getResetContainer = createDiv(getAxisContainer,"reset-container");

    carrierShip.id = "carrier-ship-img";
    battleShip.id = "battle-ship-img";
    cruiserShip.id = "cruiser-ship-img";
    submarineShip.id = "submarine-ship-img";
    destroyerShip.id = "destroyer-ship-img";

    const dragState = { id: null };

    document.querySelectorAll(".ships-selection img").forEach(img => {
        img.addEventListener("dragstart", (e) => {
            dragState.id = e.target.id; // ✅ Store the dragged ID
        });
        
        img.addEventListener("dragend", () => {
            dragState.id = null; // cleanup
        });
    });

    initialize_player_selection_board(dragState);
    initialize_Ships_Container();
}

function initialize_player_selection_board(dragState){
    const getPlayerBoard = document.querySelector(".playerBoard");
    const rows = 10;
    const cols = 10;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.occupied = false;
            highlightCells(cell,dragState);
            getPlayerBoard.appendChild(cell);
        }
    }
}

function initialize_Ships_Container(){
    document.querySelectorAll(".ships-selection img").forEach(img => {
        img.draggable = true;
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text/plain", e.target.id); // destShip.draggable = false;
        });
    });
}

function highlightCells(cell,dragState){
    cell.addEventListener("dragover", (e) => {
        e.preventDefault();

        const draggedId = dragState.id;
        if (!draggedId) return;
        let shipLength;

        if (draggedId === "carrier-ship-img") shipLength = 5;
        else if (draggedId === "battle-ship-img") shipLength = 4;
        else if (draggedId === "cruiser-ship-img") shipLength = 3;
        else if (draggedId === "submarine-ship-img") shipLength = 3;
        else if (draggedId === "destroyer-ship-img") shipLength = 2;

    
        document.querySelectorAll(".cell.highlight").forEach (c => c.classList.remove("highlight"));
    
        const startRow = parseInt(cell.dataset.row);
        const startCol = parseInt(cell.dataset.col);
                
        for (let i = 0; i < shipLength; i++) {
            if(startCol<0 || startCol>9){
                break;
            }
            const targetCol = startCol + i; // using cols here because we are placing horizontally. Row will remain same but col will change.
            const targetCell = document.querySelector(
            `.cell[data-row='${startRow}'][data-col='${targetCol}']`); // looking for the cell div whose row is the one we choose above (startRow) and col will get incremented by target col.
            if (targetCell) targetCell.classList.add("highlight");
        }
    });
    
    cell.addEventListener("dragleave", () => {
        cell.classList.remove("highlight");
    });

    placeImage(cell);
}

function placeImage(cell){

    const startRow = parseInt(cell.dataset.row);
    const startCol = parseInt(cell.dataset.col);

    cell.addEventListener("drop", (e) => {
        e.preventDefault();

        const draggedId = e.dataTransfer.getData("text/plain"); // stores the image id
        const draggedElement = document.getElementById(draggedId);
        const cols = 10;
        let shipLength;
        if (draggedId === "carrier-ship-img") shipLength = 5;
        else if (draggedId === "battle-ship-img") shipLength = 4;
        else if (draggedId === "cruiser-ship-img") shipLength = 3;
        else if (draggedId === "submarine-ship-img") shipLength = 3;
        else if (draggedId === "destroyer-ship-img") shipLength = 2;

        console.log(shipLength);
        // Collect target cells
        const targetCells = [];
        for (let i = 0; i < shipLength; i++) {
          const targetCol = startCol + i;
          if (targetCol >= cols) break;
          const targetCell = document.querySelector(
            `.cell[data-row='${startRow}'][data-col='${targetCol}']`
          );
          if (targetCell) targetCells.push(targetCell);
        }
    
        // Check validity: all must be free
        const valid = targetCells.length === shipLength &&
                      targetCells.every(c => c.dataset.occupied === "false");
    
        if (!valid) {
          alert("Invalid placement!");
          document.querySelectorAll(".cell.highlight").forEach(c => c.classList.remove("highlight"));
          return;
        }
    
        // Mark as occupied
        targetCells.forEach(c => {
          c.dataset.occupied = "true";
          c.classList.remove("highlight");
        });

        resizeImage(cell,draggedElement,shipLength);
        
        window.addEventListener('resize', function() {
            resizeImage(cell,draggedElement,shipLength);
        });
    });
}

function resizeImage(cell,draggedElement,shipLength){
    const x = cell.offsetLeft;
    const y = cell.offsetTop;
    const cellWidth = cell.offsetWidth;
    const cellHeight = cell.offsetHeight;

    draggedElement.style.position = "absolute";
    draggedElement.style.left = `${x}px`;
    draggedElement.style.top = `${y}px`;
    draggedElement.style.width = `${shipLength * cellWidth}px`;
    draggedElement.style.height = `${cellHeight}px`;
}
