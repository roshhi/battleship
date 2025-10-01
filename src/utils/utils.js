export function createTextField(appendTo,myId,myPlaceholder,inputType) {
    const input = document.createElement("input");
    input.id = myId;
    input.type = inputType;
    input.placeholder = myPlaceholder;
    input.autocomplete = "on";
    appendTo.appendChild(input);
    return input;
}

export function createTextArea(appendTo, myId, myPlaceholder) {
    const textarea = document.createElement("textarea");
    textarea.id = myId;
    textarea.placeholder = myPlaceholder;
    appendTo.appendChild(textarea);
    return textarea;
}

export function createDiv(appendTo , className){
    const myDiv = document.createElement("div");
    myDiv.classList.add(className);
    appendTo.appendChild(myDiv);
    return myDiv;
}

export function createPara(appendTo,className,text){
    const myPara = document.createElement("p");
    myPara.classList.add(className);
    myPara.textContent = text;
    appendTo.appendChild(myPara);
    return myPara;
}

export function createSVG(appendTo,className, pathD) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 25 25");
    svg.setAttribute("width", "20%");
    svg.setAttribute("height", "20%");

    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "inside-" + className);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathD);

    g.appendChild(path);
    svg.appendChild(g);

    appendTo.appendChild(svg);
    return svg;
}

export function createImage(appendTo,path,className){

    const myImg = document.createElement("img");
    myImg.src = path;
    myImg.classList.add(className);
    appendTo.appendChild(myImg);
    return myImg;
}

export function createLink(appendTo,url, text) {
    const a = document.createElement("a");
    a.href = url;
    a.textContent = text;
    a.target = "_blank"; // opens in new tab
    appendTo.appendChild(a);
    return a;
}

export function createDropdown(appendTo,htmlFor,labelTextContent,selectId,myOptions){
    const myLabel = document.createElement("label");
    myLabel.htmlFor = htmlFor ;
    myLabel.textContent = labelTextContent ;
    appendTo.appendChild(myLabel)

    const select = document.createElement("select");
    select.id = selectId;
    myOptions.forEach(option => {
        const getOption = document.createElement("option");
        getOption.value = option.value;
        getOption.label = option.label;
        select.appendChild(getOption);
    });

    appendTo.appendChild(select);

    return select;
}