import { createDiv,createImage,createPara } from "./domFunctions";

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