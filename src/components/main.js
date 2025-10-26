import { createDiv, createPara, createImage } from "../utils/domFunctions.js";
import { getShipLength,getDraggedImage,colorGridCells,createShipContainer,resetContainer } from "../utils/gameFunctions.js";
import { addSounds } from "../utils/gameFunctions.js";

import back from "../assets/images/arrow.png";
import battleShipPic from "../assets/images/battleship.png";
import carrierShipPic from "../assets/images/carrier.png";
import cruiserShipPic from "../assets/images/cruiser.png";
import submarineShipPic from "../assets/images/submarine.png";
import destroyerShipPic from "../assets/images/destroyer.png";
import crossPic from "../assets/images/hit.png"
import missPic from "../assets/images/miss.png"
import playerPic from "../assets/images/player.png"
import { displayMissMsg,displayHitMsg,checkEnemyShipDestroyed } from "../utils/gameFunctions.js";

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
    const getPlayerBoard = createDiv(getBoardsContainer,"playerBoard");
    createDiv(getBoardsContainer,"enemyBoard");


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

    getStartContainer.addEventListener('click',()=>{
        startGame();
    })
    const getResetContainer = createDiv(getResetStartContainer,"reset-container");
    createPara(getResetContainer,"reset-game-button","Reset");

    getResetContainer.addEventListener("click",()=>{
        resetContainer();
    })
    getBackBtnDiv.addEventListener("click",()=>{
        resetContainer();
    })

    // Creating message display div
    const getMsgDisplay = createDiv(getMainContent,'msg-main');
    createImage(getMsgDisplay,playerPic,"player-image");
    createPara(getMsgDisplay,"display-message","Admiral click on the enemy grid to attack !")

    // Creating ship status message display div
    const getShipStatus = createDiv(getMainContent,'status-main');
    createImage(getShipStatus,playerPic,"player-image");
    createPara(getShipStatus,"status-message","Admiral click on the enemy grid to attack !")

    // Calling add sounds function
    addSounds();

    // Initializing Game functions
    initialize_player_selection_board();
    initialize_enemy_selection_board();
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

// Function to initialize enemy board.
function initialize_enemy_selection_board(){

    //Getting miss and hit audios
    const missShotAudio = document.getElementById('missShot');
    const hitShotAudio = document.getElementById('hitShot');
    const shipStatusCheck = checkEnemyShipDestroyed();
    const getEnemyBoard = document.querySelector(".enemyBoard");
    const rows = 10;
    const cols = 10;

    // Generating random row numbers for ships
    const randomCarrierRow = Math.floor(Math.random() * 2);
    const randomBattleShipRow = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    let cruiserRow = 4;
    let submarineRow = 7;
    const randomDestroyerShipRow = Math.floor(Math.random() * (4 - 2 + 1)) + 7;

    // Generating random position index for ships
    let randomCarrierPos = Math.floor(Math.random() * 6);
    let randomBattleshipPos = Math.floor(Math.random() * 7);
    let randomCruiserPos = Math.floor(Math.random() * 5);
    let randomSubmarinePos = Math.floor(Math.random()* (6 - 2 + 1)) + 5;
    let randomDestroyerPos = Math.floor(Math.random() * 4);

    // Maintaining count for ships
    let carrierCount=0;
    let battleCount=0;
    let cruiserCount=0;
    let submarineCount=0;
    let destroyerCount=0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("mouseenter", () => {
                cell.classList.add("cellBg");  
            });
            cell.addEventListener("mouseleave", () => {
                cell.classList.remove("cellBg");
            });

            cell.dataset.row = r;
            cell.dataset.col = c;

            if(r == randomCarrierRow && c == randomCarrierPos && carrierCount!=5){
                cell.dataset.occupied = true;
                cell.classList.add("carrier-cell");
                carrierCount++;
                randomCarrierPos++;
            }
            else if(r == randomBattleShipRow && c == randomBattleshipPos && battleCount!=4){
                cell.dataset.occupied = true;
                cell.classList.add("battleship-cell");
                battleCount++;
                randomBattleshipPos++;
            }
            else if(r == cruiserRow && c == randomCruiserPos && cruiserCount!=3){
                cell.dataset.occupied = true;
                cell.classList.add("cruiser-cell");
                cruiserRow++;
                cruiserCount++;
            }
            else if(r == submarineRow && c == randomSubmarinePos && submarineCount!=3){
                cell.dataset.occupied = true;
                cell.classList.add("submarine-cell");
                submarineRow++;
                submarineCount++;
            }
            else if(r == randomDestroyerShipRow && c == randomDestroyerPos && destroyerCount!=2){
                cell.dataset.occupied = true;
                cell.classList.add("destroyer-cell");
                randomDestroyerPos++;
                destroyerCount++;
            }
            else{
                cell.dataset.occupied = false;
            }
            cell.addEventListener('click',()=>{
                if(cell.dataset.occupied == 'true'){
                    cell.style.backgroundImage = `url('${crossPic}')`;
                    cell.style.backgroundSize = "cover"; 
                    cell.style.backgroundPosition = "center";
                    cell.style.backgroundRepeat = "no-repeat"; 
                    cell.style.pointerEvents = "none";  
                    cell.classList.add("hit");
                    displayHitMsg();
                    missShotAudio.pause();
                    hitShotAudio.currentTime = 0;
                    hitShotAudio.play();
                    shipStatusCheck();
                }
                else if(cell.dataset.occupied == 'false'){
                    cell.style.backgroundImage = `url('${missPic}')`;
                    cell.style.backgroundSize = "cover"; 
                    cell.style.backgroundRepeat = "no-repeat";   
                    cell.style.backgroundPosition = "center";
                    cell.style.pointerEvents = "none";
                    cell.classList.add("miss");
                    displayMissMsg();
                    hitShotAudio.pause();
                    missShotAudio.currentTime = 0;
                    missShotAudio.play();
                }
            })
            getEnemyBoard.appendChild(cell);
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
            else{
                draggedElement.classList.add('hide');
                dragState.id = null;
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


function startGame(){

    const getAxisContainer = document.querySelector(".axis-container");
    const getResetStartContainer = document.querySelector(".reset-start-container");
    const getShipSelectionBorad = document.querySelector(".ships-selection");
    const getEnemyBoard = document.querySelector(".enemyBoard");
    const getMsgDisplay = document.querySelector(".msg-main");

    getAxisContainer.classList.add("hide");
    getResetStartContainer.classList.add("hide");
    getShipSelectionBorad.classList.add("removeDom");
    getEnemyBoard.classList.add("addDom");
    getMsgDisplay.classList.add("show");
}