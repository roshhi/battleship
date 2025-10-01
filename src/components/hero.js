import { createDiv, createPara, createSVG, createTextField,  createImage } from "../utils/utils.js";

import ship1 from "../assets/images/ship1.png";
import ship2 from "../assets/images/ship2.png";


export default function hero() {
    const getContainer = document.querySelector(".container");

    const getHero = createDiv(getContainer,"hero");

    const getMenu = createDiv(getHero,"menu");
    createPara(getMenu,"game-title","BattleShip")
    const getMenuButtons = createDiv(getMenu,"menu-buttons");
    createDiv(getMenuButtons,"start-btn");
    createDiv(getMenuButtons,"instruction-btn");
    createDiv(getMenuButtons,"setting-btn");


    const getShipsContainer = createDiv(getHero,"ships-container");
    createImage(getShipsContainer,ship1,"ship-one");
    createImage(getShipsContainer,ship2,"ship-two");

} 