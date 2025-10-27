import { createDiv,createImage,createPara } from "./domFunctions";
import crossPic from "../assets/images/hit.png"
import missPic from "../assets/images/miss.png"
import enemyPic from "../assets/images/enemy.png"

// Function to create a ship container.
export function createShipContainer(appendTo,shipPic,shipClassName,shipTitle,shipId){
    const getShipContainer = createDiv(appendTo,"ship-container");
    const ship = createImage(getShipContainer,shipPic,shipClassName);
    createPara(getShipContainer,"ship-name",shipTitle)
    ship.id = shipId;
}

// Function to get the size of ship image which is being dragged.
export function getShipLength(draggedId){
    let shipLength;
    if (draggedId === "carrier-ship-img") shipLength = 5;
    else if (draggedId === "battle-ship-img") shipLength = 4;
    else if (draggedId === "cruiser-ship-img") shipLength = 3;
    else if (draggedId === "submarine-ship-img") shipLength = 3;
    else if (draggedId === "destroyer-ship-img") shipLength = 2;

    return shipLength;
}

// Function to color the grid cells over which image is placed
export function colorGridCells(targetCells){

    targetCells.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

// Function to get the state of the image which is being dragged.
export function getDraggedImage(){
    // Storing the id of the image which is being dragged in a object .
    const dragState = { id: null };
    document.querySelectorAll(".ships-selection img").forEach(img => {
        img.draggable = true;
        img.addEventListener("dragstart", (e) => {
            dragState.id = e.target.id;
        });
    });
    return dragState;
}

// Function to reset the container after placing the ships on it.
export function resetContainer(){
    const getAllCells = document.querySelectorAll(".playerBoard div");
    const xAxisContainer = document.querySelector(".Xaxis-container");
    const yAxisContainer = document.querySelector(".Yaxis-container");

    xAxisContainer.classList.add('selected');
    yAxisContainer.classList.remove('selected');

    getAllCells.forEach(cell => {
        cell.style.backgroundColor = '';
        cell.dataset.occupied = "false";
    });
    document.querySelectorAll(".ships-selection img").forEach(img => {
        img.draggable = true;
        img.classList.remove('hide')
    });
}

// Function to add the sound effects on different clicks
export function addSounds(){
    const music = document.getElementById('bgMusic');
    const click = document.getElementById('btnClick');
    const getToggle = document.querySelector(".toggle");
    const classNames = [
        'main-back-img',
        'back-img',
        'instruction-back-btn',
        'Xaxis-container',
        'Yaxis-container',
        'reset-container',
        'start-container',
        'start-btn',
        'instruction-btn',
        'setting-btn',
        'toggle'
    ];
    classNames.forEach(className => {
        const buttons = document.querySelectorAll(`.${className}`);
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                click.play();
            });
        });
    });
    let counter = 0;
    getToggle.addEventListener("click",()=>{
        if(counter%2==0){
            music.play();
        }
        else{
            music.pause();
            music.currentTime = 0;
        }
        counter++;
    })
}

// Function to display messages on screen if player miss the shot
export function displayMissMsg(){

    const getMsgDisplayPara = document.querySelector(".display-message");
    const missMessages = [
        "Admiral, that shot missed the target!",
        "Negative hit, Admiral — water strike confirmed.",
        "No contact, Admiral. The enemy remains hidden.",
        "Admiral, our cannons hit nothing but waves!",
        "Splash only, Admiral — no damage dealt.",
        "Admiral, coordinates off by a few meters. Try again!",
        "All clear, Admiral. No enemy vessel detected.",
        "Missed, Admiral. Adjust your aim and fire again.",
        "Admiral, the shot went wide — enemy untouched.",
        "Our torpedoes missed, Admiral. Recalculating trajectory.",
        "No impact, Admiral. Enemy still operational.",
        "Admiral, the shot landed in open sea.",
        "Target not found, Admiral. We’re firing blind!",
        "Admiral, our artillery overshot the target!",
        "Admiral, that’s a clean miss — better luck next time."
    ];
    const message = missMessages[Math.floor(Math.random() * missMessages.length)];
    getMsgDisplayPara.textContent= message;
}

// Function to display messages on screen if player hit the target
export function displayHitMsg(){

    const getMsgDisplayPara = document.querySelector(".display-message");
    const hitMessages = [
        "Direct hit, Admiral! Enemy vessel taking damage!",
        "Bullseye, Admiral — we’ve struck the target!",
        "Confirmed impact, Admiral! That one’s gonna leave a mark.",
        "Admiral, our cannons found their mark!",
        "Hit confirmed, Admiral! Enemy ship listing!",
        "Admiral, beautiful shot! Target hit square on.",
        "Enemy vessel struck, Admiral — flames spotted!",
        "Admiral, we’ve breached their hull!",
        "Excellent aim, Admiral! That shot connected perfectly.",
        "Admiral, another solid hit! Enemy defenses weakening.",
        "Impact confirmed, Admiral! Enemy crew in disarray.",
        "Admiral, we’ve got smoke rising from the target!",
        "Direct hit, Admiral — target’s structure compromised!",
        "Admiral, your precision is unmatched. That’s a hit!",
        "Solid strike, Admiral! We’re breaking through their line."
    ];
    const message = hitMessages[Math.floor(Math.random() * hitMessages.length)];
    getMsgDisplayPara.textContent= message;
}

// Function to check whether a particular enemy ship is destroyed or not to display pop up and check for win.
export function checkEnemyShipDestroyed(){

    let carrierCount=0;
    let battleCount=0;
    let cruiserCount=0;
    let submarineCount=0;
    let destroyerCount=0;

    return function check(){

        const statusMain = document.querySelector('.status-main');
        const getStatusDisplayPara = document.querySelector(".status-message");

        // --- Carrier ---
        const carrierCells = document.querySelectorAll(".carrier-cell");
        const allCarrierHit = Array.from(carrierCells).every(cell => cell.classList.contains("hit"));
        if(carrierCount==0){
            if (carrierCells.length > 0 && allCarrierHit) {
                getStatusDisplayPara.textContent= "Enemy Carrier Ship (5f) destroyed!";
                if(!statusMain.classList.contains("show")){
                    statusMain.classList.add('show');
                }
                statusMain.style.animation = 'none';
                void statusMain.offsetWidth; 
                statusMain.style.animation = "slideMessage 4s forwards";
                carrierCount=1;
            }
        }

        // --- Battleship ---
        const battleshipCells = document.querySelectorAll(".battleship-cell");
        const allBattleshipHit = Array.from(battleshipCells).every(cell => cell.classList.contains("hit"));
        if(battleCount==0){
            if (battleshipCells.length > 0 && allBattleshipHit) {
                getStatusDisplayPara.textContent= "Enemy BattleShip (4f) has been sunk!";
                if(!statusMain.classList.contains("show")){
                    statusMain.classList.add('show');
                }
                statusMain.style.animation = 'none';
                void statusMain.offsetWidth; 
                statusMain.style.animation = "slideMessage 4s forwards";
                battleCount=1;
            }
        }   

        // --- Cruiser ---
        const cruiserCells = document.querySelectorAll(".cruiser-cell");
        const allCruiserHit = Array.from(cruiserCells).every(cell => cell.classList.contains("hit"));
        if(cruiserCount==0){
            if (cruiserCells.length > 0 && allCruiserHit) {
                getStatusDisplayPara.textContent= "Enemy CRUISER (3f) has been sunk!";
                if(!statusMain.classList.contains("show")){
                    statusMain.classList.add('show');
                }
                statusMain.style.animation = 'none';
                void statusMain.offsetWidth; 
                statusMain.style.animation = "slideMessage 4s forwards";
                cruiserCount=1
            }
        }

        // --- Submarine ---
        const submarineCells = document.querySelectorAll(".submarine-cell");
        const allSubmarineHit = Array.from(submarineCells).every(cell => cell.classList.contains("hit"));
        if(submarineCount==0){
            if (submarineCells.length > 0 && allSubmarineHit) {
                getStatusDisplayPara.textContent= "Enemy SUBMARINE (3f) destroyed!";
                if(!statusMain.classList.contains("show")){
                    statusMain.classList.add('show');
                }
                statusMain.style.animation = 'none';
                void statusMain.offsetWidth; 
                statusMain.style.animation = "slideMessage 4s forwards";
                submarineCount=1;
            }
        }

        // --- Destroyer ---
        const destroyerCells = document.querySelectorAll(".destroyer-cell");
        const allDestroyerHit = Array.from(destroyerCells).every(cell => cell.classList.contains("hit"));
        if(destroyerCount==0){
            if (destroyerCells.length > 0 && allDestroyerHit) {
                getStatusDisplayPara.textContent= "Enemy Destroyer (2f) has been sunk!";
                if(!statusMain.classList.contains("show")){
                    statusMain.classList.add('show');
                }
                statusMain.style.animation = 'none';
                void statusMain.offsetWidth; 
                statusMain.style.animation = "slideMessage 4s forwards";
                destroyerCount=1;
            }
        }

        if(carrierCount ==1 && battleCount==1 && cruiserCount==1 && submarineCount==1 && destroyerCount==1){
            const getMain = document.querySelector('.mainContent');
            const getGameEnd = document.querySelector('.game-end');
        
            getMain.classList.remove('show');
            getGameEnd.classList.add('show')
        }
    }
}


// Function for the enemy attack
export function enemyAttack() {

    const getEnemyBoard = document.querySelector(".enemyBoard");
    const generatedNumbers = [];
    const focusTargets = [];
    const getPlayerBoardCells = document.querySelectorAll(".playerBoard div");
    const missShotAudio = document.getElementById('missShot');
    const hitShotAudio = document.getElementById('hitShot');
    let sunkCellCount = 0;

    function markHit(cell) {
        getEnemyBoard.style.pointerEvents = 'none';
        cell.style.backgroundImage = `url('${crossPic}')`;
        cell.style.backgroundSize = "cover";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundColor = 'transparent';
        cell.classList.add("sunk");
        hitShotAudio.currentTime = 0;
        hitShotAudio.play();
        sunkCellCount++;
    }

    function markMiss(cell) {
        getEnemyBoard.style.pointerEvents = 'auto';
        cell.style.backgroundImage = `url('${missPic}')`;
        cell.style.backgroundSize = "cover";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundRepeat = "no-repeat";
        missShotAudio.currentTime = 0;
        missShotAudio.play();
    }

    function getCell(r, c) {
        return document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
    }

    return function attack(focusMode = false) {
        if(sunkCellCount==17){
            const getMain = document.querySelector('.mainContent');
            const getGameEnd = document.querySelector('.game-end');
            const getPara = document.querySelector('.win-msg');
            const getImg = document.querySelector('.win-msg-pic');
            getImg.src = enemyPic;
            getMain.classList.remove('show');
            getPara.textContent = 'Defeat !';
            getGameEnd.classList.add('show')
            
        }
        if (!focusMode) {

            let cellAttackOffset;
            do {
                cellAttackOffset = Math.floor(Math.random() * 100);
            } while (
                generatedNumbers.includes(cellAttackOffset) ||  // already attacked
                getPlayerBoardCells[cellAttackOffset].classList.contains("sunk") // already sunk
            );
            generatedNumbers.push(cellAttackOffset);

            const targetCell = getPlayerBoardCells[cellAttackOffset];

            if (targetCell.dataset.occupied === 'true') {
                
                const cellRow = Number(targetCell.dataset.row);
                const cellCol = Number(targetCell.dataset.col);

                // 4 cells above
                for (let i = 1; i <= 4; i++) {
                    const target = getCell(cellRow - i, cellCol);
                    if (!target || target.dataset.occupied == "false" || target.classList.contains("sunk")) break;
                    else{
                        if (target) focusTargets.push(target);
                    }
                }
    
                // 4 cells below
                for (let i = 1; i <= 4; i++) {
                    const target = getCell(cellRow + i, cellCol);
                    if (!target || target.dataset.occupied == "false" || target.classList.contains("sunk")) break;
                    else{
                        if (target) focusTargets.push(target);
                    }            
                }
    
                // 4 cells left
                for (let i = 1; i <= 4; i++) {
                    const target = getCell(cellRow, cellCol - i);
                    if (!target || target.dataset.occupied == "false" || target.classList.contains("sunk")) break;
                    else{
                        if (target) focusTargets.push(target);
                    }            
                }
    
                // 4 cells right
                for (let i = 1; i <= 4; i++) {
                    const target = getCell(cellRow, cellCol + i);
                    if (!target || target.dataset.occupied == "false" || target.classList.contains("sunk")) break;
                    else{
                        if (target) focusTargets.push(target);
                    }            
                }
                markHit(targetCell);

                if (focusTargets.length > 0) {
                    attack(true);
                }

            } else {
                markMiss(targetCell);
            }
        } 
        else if (focusMode) {
            focusTargets.forEach((cell, index) => {
                setTimeout(() => {
                    markHit(cell);      
                }, 1000 * (index + 1));
            });
            const totalDelay = 1000 * focusTargets.length;
            focusTargets.length = 0; 
            setTimeout(() => {
                attack(false);
            }, totalDelay + 500);
        }
    }
}
