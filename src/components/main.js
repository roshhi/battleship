import { createDiv, createPara, createSVG, createImage } from "../utils/utils.js";
import back from "../assets/images/arrow.png";

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

    const getBoardsContainer = createDiv(getMainContent,"strategy-board-container"); 
    const getPlayerBoard = createDiv(getBoardsContainer,"playerBoard");
    const rows = 10;
    const cols = 10;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // cell.dataset.row = r;
            // cell.dataset.col = c;
            getPlayerBoard.appendChild(cell); // add cell to board
        }
    }

    const getShipSelectionBorad = createDiv(getBoardsContainer,"ships-selection");

}