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
