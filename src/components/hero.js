import { createDiv, createPara, createSVG, createTextField,  createImage } from "../utils/utils.js";

import ship1 from "../assets/images/ship1.png";
import ship2 from "../assets/images/ship2.png";
import back from "../assets/images/arrow.png";


export default function hero() {

    const getContainer = document.querySelector(".container");
    const getHero = createDiv(getContainer,"hero");

    // Creating menu
    const getMenu = createDiv(getHero,"menu");
    const getTitle = createPara(getMenu,"game-title","BattleShip")
    const getMenuButtons = createDiv(getMenu,"menu-buttons");

    // Creating Start button
    const getStartBtn = createDiv(getMenuButtons,"start-btn");
    createPara(getStartBtn,"menu-btn-txt","Play");

    // Creating Instruction button
    const getInstBtn = createDiv(getMenuButtons,"instruction-btn");
    createPara(getInstBtn,"menu-btn-txt","Instruction");

    // Creating Instruction div
    const getInstructionDiv = createDiv(getMenu,"instruction-main");
    createPara(getInstructionDiv,"instruction-text-heading","⚓ Battleship Instructions!");
    createPara(getInstructionDiv,"instruction-text","Objective: Sink all enemy ships before they sink yours!");
    createPara(getInstructionDiv,"instruction-text","Setup: Each player has a grid. Ships are hidden on the grid.");

    // Creating Settings button
    const getSettBtn = createDiv(getMenuButtons,"setting-btn");
    createPara(getSettBtn,"menu-btn-txt","Settings");

    // Creating Back button
    const getBackBtn = createDiv(getMenu,"back-btn");
    createImage(getBackBtn,back,"back-img");

    // Creating Sound button
    const getSoundDiv = createDiv(getMenu,"sound-main");
    createPara(getSoundDiv,"sound-text","Sound");
    const getToggle = createDiv(getSoundDiv,"toggle");
    createDiv(getToggle,"toggle-circle");
    let count=0;

    // Creating ships container
    const getShipsContainer = createDiv(getHero,"ships-container");
    const getShipOne = createImage(getShipsContainer,ship1,"ship-one");
    const getShipTwo = createImage(getShipsContainer,ship2,"ship-two");


    // ----------------------------- Adding Event Listners ----------------------------- 

    // Adding event listner to start button
    getStartBtn.addEventListener("click",()=>{
        getMenu.classList.add("hide");
        getShipsContainer.classList.add("hide");
    })

    // Adding event listner to instruction button
    getInstBtn.addEventListener("click",()=>{
        getInstructionDiv.classList.add("show");
        getTitle.classList.add("hide");
        getMenuButtons.classList.add("hide");
    })

    // Adding event listner to back button
    getBackBtn.addEventListener("click",()=>{
        getTitle.classList.remove("hide");
        getMenuButtons.classList.remove("hide");
        getBackBtn.classList.remove("show");
        getSoundDiv.classList.remove("show");
        getInstructionDiv.classList.remove("show");
    })

    // Adding event listner to sound button
    getToggle.addEventListener("click",()=>{
        if(count%2==0){
            getToggle.classList.add("active");
        }else{
            getToggle.classList.remove("active");
        }
        count++;
    })

    // Adding event listner to settings button
    getSettBtn.addEventListener("click",()=>{
        getTitle.classList.add("hide");
        getMenuButtons.classList.add("hide");
        getBackBtn.classList.add("show");
        getSoundDiv.classList.add("show");
    })


    // ------------- Adding Intersection Observers on Ship images ------------- 

    const shipOneObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-ship-left");
            shipOneObserver.unobserve(entry.target);
          }
        });
    }, { threshold: 0.2 });

    const shipTwoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-ship-right");
            shipTwoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });  
      
    shipOneObserver.observe(getShipOne);
    shipTwoObserver.observe(getShipTwo);
} 



  