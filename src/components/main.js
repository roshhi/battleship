import { createDiv, createPara, createImage } from "../utils/domFunctions.js";
import { getShipLength,getDraggedImage,colorGridCells,createShipContainer,resetContainer } from "../utils/gameFunctions.js";
import { addSounds } from "../utils/gameFunctions.js";

import back from "../assets/images/arrow.png";
import battleShipPic from "../assets/images/battleship.png";
import carrierShipPic from "../assets/images/carrier.png";
import cruiserShipPic from "../assets/images/cruiser.png";
import submarineShipPic from "../assets/images/submarine.png";
import destroyerShipPic from "../assets/images/destroyer.png";


export default function main() {
    
    const getContainer = document.querySelector(".container");
    const getMainContent = createDiv(getContainer,"mainContent");

    // Getitng the start button and attaching the event listner to it.
    const getStartBtn = document.querySelector(".start-btn");
    getStartBtn.addEventListener("click",()=>{
        getMainContent.classList.add("show");
    });

    // Creating the back button and attaching the event listner to it.
    const getBackBtnDiv = createDiv(getMainContent,"main-back-btn");
    const getBackBtn = createImage(getBackBtnDiv,back,"main-back-img");
    getBackBtn.addEventListener("click",()=>{
        document.querySelector(".menu").classList.remove("hide");
        document.querySelector(".ships-container").classList.remove("hide");
        getMainContent.classList.remove("show");
    });

    // Creating one main container to hold axis selection,player board and start/reset button div.
    const getMainContainer = createDiv(getMainContent,"main-container"); 

    // Creating axis selection container and buttons.
    const getAxisContainer = createDiv(getMainContainer,"axis-container");
    const getXAxisContainer = createDiv(getAxisContainer,"Xaxis-container");
    createPara(getXAxisContainer,"x-button","X axis");
    const getYAxisContainer = createDiv(getAxisContainer,"Yaxis-container");
    createPara(getYAxisContainer,"y-button","Y axis");

    // Creating player board.
    const getBoardsContainer = createDiv(getMainContainer,"strategy-board-container"); 
    createDiv(getBoardsContainer,"playerBoard");

    // Creating ship selection board.
    const getShipSelectionBorad = createDiv(getBoardsContainer,"ships-selection");
    
    // Creating ship containers.
    createShipContainer(getShipSelectionBorad,carrierShipPic,"carrier-ship","Carrier (5f)", "carrier-ship-img");
    createShipContainer(getShipSelectionBorad,battleShipPic,"battle-ship","Battleship (4f)", "battle-ship-img");
    createShipContainer(getShipSelectionBorad,cruiserShipPic,"cruiser-ship","Cruiser (3f)","cruiser-ship-img");
    createShipContainer(getShipSelectionBorad,submarineShipPic,"submarine-ship","Submarine (3f)","submarine-ship-img");
    createShipContainer(getShipSelectionBorad,destroyerShipPic,"destroyer-ship","Destroyer (2f)", "destroyer-ship-img");

    // Creating start / reset button.
    const getResetStartContainer = createDiv(getMainContainer,"reset-start-container");
    const getStartContainer = createDiv(getResetStartContainer,"start-container");
    createPara(getStartContainer,"start-game-button","Start");
    const getResetContainer = createDiv(getResetStartContainer,"reset-container");
    createPara(getResetContainer,"reset-game-button","Reset");

    getResetContainer.addEventListener("click",()=>{
        resetContainer();
    })
    getBackBtnDiv.addEventListener("click",()=>{
        resetContainer();
    })

    // Calling add sounds function
    addSounds();

    // Initializing Game functions
    initialize_player_selection_board();
    highlightCells();
    placeImage();
}

// -------------------------------- Fucnctions definition starts from here ------------------------------------


// Function to initialize player board.
function initialize_player_selection_board(){
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
            getPlayerBoard.appendChild(cell);
        }
    }
}

// Function to highlight the board cells being hovered over.
function highlightCells(){

    let axis = "x"; //default axis is x
    const xAxisContainer = document.querySelector(".Xaxis-container");
    xAxisContainer.classList.add('selected')

    const yAxisContainer = document.querySelector(".Yaxis-container");
    xAxisContainer.addEventListener("click",()=>{
        axis = "x";
        yAxisContainer.classList.remove('selected')
        xAxisContainer.classList.add('selected')
    })
    yAxisContainer.addEventListener("click",()=>{
        axis = "y";     
        yAxisContainer.classList.add('selected');
        xAxisContainer.classList.remove('selected')
    })

    // Getting all the cells.
    const getAllCells = document.querySelectorAll(".playerBoard div");

    // Getting the state of the image which is being dragged.
    const dragState = getDraggedImage();

    getAllCells.forEach(cell => {
        cell.addEventListener("dragover", (e) => {
            e.preventDefault();
    
            const draggedId = dragState.id;
            if (!draggedId) return;
        
            let shipLength = getShipLength(draggedId);
            document.querySelectorAll(".cell.highlight").forEach (c => c.classList.remove("highlight"));
        
            const startRow = parseInt(cell.dataset.row);
            const startCol = parseInt(cell.dataset.col);
                    
            for (let i = 0; i < shipLength; i++) {
                if(startCol<0 || startCol>9 || startRow<0 || startRow>9){
                    break;
                }
                let targetCell;
                if(axis=='x'){
                    const targetCol = startCol + i; // using cols here because we are placing horizontally. Row will remain same but col will change.
                    targetCell = document.querySelector(
                    `.cell[data-row='${startRow}'][data-col='${targetCol}']`); // looking for the cell div whose row is the one we choose above (startRow) and col will get incremented by target col.
                }
                else{
                    const targetRow = startRow + i; // using rows here because we are placing vertically. Col will remain same but row will change.
                    targetCell = document.querySelector(
                    `.cell[data-row='${targetRow}'][data-col='${startCol}']`); // looking for the cell div whose row is the one we choose above (startRow) and col will get incremented by target col.
                }
                if (targetCell) targetCell.classList.add("highlight");
            }
        });

        cell.addEventListener("dragleave", () => {
            cell.classList.remove("highlight");
        });
    });
}

// Function to place the image over the cells.
function placeImage(){

    let axis = "x";

    document.querySelector(".Xaxis-container").addEventListener("click",()=>{
        axis = "x";
    })
    document.querySelector(".Yaxis-container").addEventListener("click",()=>{
        axis = "y";
    })

    const getAllCells = document.querySelectorAll(".playerBoard div");
    const dragState = getDraggedImage();

    getAllCells.forEach(cell => {
        const startRow = parseInt(cell.dataset.row);
        const startCol = parseInt(cell.dataset.col);

        cell.addEventListener("drop", (e) => {
            e.preventDefault();

            // Getting the ship image which is being dragged via its id
            const draggedId = dragState.id;
            const draggedElement = document.getElementById(draggedId);

            const cols = 10;
            const rows = 10;

            let shipLength = getShipLength(draggedId); // Getting the length of ship image which is being dragged.

    
            // Collect target cells
            const targetCells = [];

            if(axis=="x"){
                for (let i = 0; i < shipLength; i++) {
                    const targetCol = startCol + i;
                    if (targetCol >= cols) break;
                    const targetCell = document.querySelector(
                        `.cell[data-row='${startRow}'][data-col='${targetCol}']`
                    );
                    if (targetCell) targetCells.push(targetCell);
                }
            }
            else{
                for (let i = 0; i < shipLength; i++) {

                    const targetRow = startRow + i; 
                    if (targetRow >= rows) break;

                    const targetCell = document.querySelector(
                        `.cell[data-row='${targetRow}'][data-col='${startCol}']`
                    );
                    if (targetCell) targetCells.push(targetCell);
                }
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
            draggedElement.draggable = false;
            colorGridCells(targetCells);
        });
    });  
}
