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

// Function to resize the ship image which is being dragged if screen resolution changes.
export function resizeImage(cell,draggedElement,shipLength){
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

// Function to get the state of the image which is being dragged.
export function getDraggedImage(){
    // Storing the id of the image which is being dragged in a object .
    const dragState = { id: null };
    document.querySelectorAll(".ships-selection img").forEach(img => {
        img.draggable = true;
        img.addEventListener("dragstart", (e) => {
            dragState.id = e.target.id;
        });
        img.addEventListener("dragend", () => {
            dragState.id = null;
        });
    });
    return dragState;
}
