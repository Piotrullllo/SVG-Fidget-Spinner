const fidgetSpinner = document.querySelector("#Component_1_1");
let flag = false;
let i = 0;
let speed = 1;
let elements = [];
let colorOne = "#38b72c";
let colorTwo = "#5dd14a";

function spin(){
    i += speed;
    fidgetSpinner.style.transform = `rotate(${i}deg)`;
    if(i >= 359){
        i = 0;
    }
    if(speed > 0){
        speed -= 1/30;
        slowBtn.disabled = false;
    } else if(speed < 1/30){
        slowBtn.disabled = true; 
        speed = 0;
        flag = false;
        clearInterval(interval);
        funcBtn.innerHTML = "Zakręć spinnerkiem";
    }
};

let interval;

function spinUpOrDown(){
    if(flag === false){
        flag = true;
        slowBtn.disabled = false;
        interval = setInterval(spin, 1000/60);
        funcBtn.innerHTML = "Zatrzymaj spinnerka";
        speed = Math.floor(Math.random() * (64 - 20)) + 20;
    } else {
        flag = false;
        slowBtn.disabled = true;
        clearInterval(interval);
        funcBtn.innerHTML = "Zakręć spinnerkiem";
    }
}

function slower(){
    if(speed > 1){
        speed -- ;
    } else {
        slowBtn.disabled = true;
        flag = false;
        clearInterval(interval);
        funcBtn.innerHTML = "Zakręć spinnerkiem";
    }
}

function faster(){
    if(flag === false){
        flag = true;
        slowBtn.disabled = false;
        interval = setInterval(spin, 1000/60);
        funcBtn.innerHTML = "Zatrzymaj spinnerka";
        speed = 4;
    } else if(speed < 64 && speed > 1/24){
        speed++;
    }
}

function scrollFunc(event){
    if(event.deltaY < 0 && flag === false){
        flag = true;
        slowBtn.disabled = false;
        speed = 4;
        interval = setInterval(spin, 1000/60);
        funcBtn.innerHTML = "Zatrzymaj spinnerka";
    } else if (event.deltaY > 0){
        slower();
    } else {
        faster();
    }
}

function changeColor(){
    let option = chgColor.options[chgColor.selectedIndex].value;
    switch (option){
        case 'gre':
            colorOne = "#38b72c";
            colorTwo = "#5dd14a"; 
            break;
        case 'red':
            colorOne = "#b7382c";
            colorTwo = "#d15d4a"; 
            break;
        case 'blu':
            colorOne = "#382cb7";
            colorTwo = "#5d4ad1"; 
            break;
        case 'yel':
            colorOne = "#ffda00";
            colorTwo = "#ffff03"; 
            break;
        case 'ora':
            colorOne = "#ff6600";
            colorTwo = "#ff8b3d"; 
            break;
        case 'pur':
            colorOne = "#734498";
            colorTwo = "#864fb2"; 
            break;
        case 'sil':
            colorOne = "#BBBBBB";
            colorTwo = "#CCCCCC"; 
            break;
        case 'gol':
            colorOne = "#d5ad59";
            colorTwo = "#f9c442"; 
            break;
        default:
            colorOne = "#38b72c";
            colorTwo = "#5dd14a"; 
            break;
    }
    for(i=0; i < 5;i++){
        elements[i].style.fill = colorOne;
    }
    elements[5].style.fill = colorTwo;
}

for(i=0; i < 6;i++){
    elements[i] = document.querySelector(`#El${i+1}`)
}

const fastBtn = document.querySelector(".speedUp");
const funcBtn = document.querySelector(".startStop");
const slowBtn = document.querySelector(".speedDown");
const chgColor = document.querySelector("#colorSelector");
slowBtn.addEventListener("click", slower);
funcBtn.addEventListener("click", spinUpOrDown);
fastBtn.addEventListener("click", faster);
chgColor.onchange=changeColor;

window.addEventListener('wheel', scrollFunc);