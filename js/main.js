const plLang = ["Zakręć spinnerkiem", "Zatrzymaj spinnerka", "Przyspiesz", "Zwolnij", "Język: ", "Wybierz kolor: ","Zielony","Czerwony","Niebieski","Zółty","Pomarańczowy","Purpurowy","Srebrny","Złoty", "Niestandardowy", "Podaj wartość koloru czerwonego (w zakresie 0 - 255): ", "Podaj wartość koloru zielonego (w zakresie 0 - 255): ", "Podaj wartość koloru niebieskiego (w zakresie 0 - 255): ", "Błąd- wartość niepoprawna"];
const enLang = ["Spin up", "Stop", "Accelerate", "Slow down", "Language: ", "Choose color: ","Green","Red","Blue","Yellow","Orange","Purple","Silver","Gold","Custom", "Enter value of the red color (between 0 and 255): ", "Enter value of the green color (between 0 and 255): ", "Enter value of the blue color (between 0 and 255): ", "Error - incorect value"];
let curLanguage = [...enLang];

const fidgetSpinner = document.querySelector("#Component_1_1");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let flag = false;
let i = 0;
let speed = 1;
let elements = [];
let colorOne = "#38b72c";
let colorTwo = "#5dd14a";
let sec = 0;
let min = 0;

const spinOn = () => {
    flag = true;
    slowBtn.disabled = false;
    interval = setInterval(spin, 1000/60);
    timeReset();
    timerinterval = setInterval(timeCount, 10);
    funcBtn.innerHTML = curLanguage[1];
    chgColor.disabled = true;
}

const spinOff = () => {
    slowBtn.disabled = true;
    flag = false;
    clearInterval(interval);
    clearInterval(timerinterval);
    funcBtn.innerHTML = curLanguage[0];
    chgColor.disabled = false;
}

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
        speed = 0;
        spinOff();
    }
};

let interval;
let timerinterval;

function spinUpOrDown(){
    if(flag === false){
        speed = Math.floor(Math.random() * (64 - 20)) + 20;
        spinOn();
    } else {
        spinOff();
    }
}

function slower(){
    if(speed > 1){
        speed -- ;
    } else {
        spinOff();
    }
}

function faster(){
    if(flag === false){
        speed = 4;
        spinOn();
    } else if(speed < 64 && speed > 1/24){
        speed++;
    }
}

function scrollFunc(event){
    if(event.deltaY < 0 && flag === false){
        speed = 4;
        spinOn();
    } else if (event.deltaY > 0){
        slower();
    } else {
        faster();
    }
}

const timeCount = () => {
    sec += 0.01;
    if(sec < 9.99){
        seconds.innerHTML = "0"+sec.toFixed(2);
    } else {
        seconds.innerHTML = sec.toFixed(2);
    }
    if(sec >= 60){
        min += 1;
        sec = 0;
        if (min < 10){
            minutes.innerHTML = "0"+min;
        } else {
            minutes.innerHTML = min;
        }
    }
}

const timeReset = () => {
    sec = 0;
    min = 0;
    seconds.innerHTML = "00.00";
    minutes.innerHTML = "00";
}

function customColor(){
    let r;
    let g;
    let b;
    let altR;
    let altG;
    let altB;
    while(true){
        r = parseInt(prompt(curLanguage[15]));
        if (r >= 0 && r <= 255){
            break;
        } else {
            alert(curLanguage[18]);
        }
    }
    while(true){
        g = parseInt(prompt(curLanguage[16]));
        if (g >= 0 && g <= 255){
            break;
        } else {
            alert(curLanguage[18]);
        }
    }
    while(true){
        b = parseInt(prompt(curLanguage[17]));
        if (b >= 0 && b <= 255){
            break;
        } else {
            alert(curLanguage[18]);
        }
    }
    colorOne = `rgb(${r},${g},${b})`;
    if(r < 128){
        altR = r+64;
    } else {
        altR = r-64;
    }
    if(g < 128){
        altG = g+64;
    } else {
        altG = g-64;
    }
    if(b < 128){
        altB = b+64;
    } else {
        altB = b-64;
    }
    colorTwo = `rgb(${altR},${altG},${altB})`;
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
        case 'cus':
            customColor();
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

function changeLanguage(){
    let lang = chgLang.options[chgLang.selectedIndex].value;
    switch(lang){
        case 'en':
            curLanguage = [...enLang];
            document.documentElement.lang = 'en';
            break;
        case 'pl':
            curLanguage = [...plLang];
            document.documentElement.lang = 'pl';
            break;
    }
    if(flag){
        funcBtn.innerHTML = curLanguage[1];
    } else {
        funcBtn.innerHTML = curLanguage[0];
    }
    fastBtn.innerHTML = curLanguage[2];
    slowBtn.innerHTML = curLanguage[3];
    const colorOptions = document.querySelectorAll("#colorSelector option");
    for(i=0; i < colorOptions.length; i++){
        colorOptions[i].innerHTML = curLanguage[i+6];
    }
    document.querySelector(".colSelLabel").innerHTML = curLanguage[5];
    document.querySelector(".langSelLabel").innerHTML = curLanguage[4];
}

const fastBtn = document.querySelector(".speedUp");
const funcBtn = document.querySelector(".startStop");
const slowBtn = document.querySelector(".speedDown");
const chgColor = document.querySelector("#colorSelector");
const chgLang = document.querySelector("#langSelect");
chgLang.addEventListener("change", changeLanguage);
slowBtn.addEventListener("click", slower);
funcBtn.addEventListener("click", spinUpOrDown);
fastBtn.addEventListener("click", faster);
chgColor.onchange=changeColor;

window.addEventListener('wheel', scrollFunc);
window.addEventListener('keypress', (e) => {
    if (e.code == "Space"){
        spinUpOrDown();
    }
});
