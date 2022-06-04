// Loader

const onLoad = () => {
    hideLoader();
}

const showLoader = () => {
    document.getElementById("loader").hidden = false;
}

const hideLoader = () => {
    document.getElementById("loader").hidden = true;
}

// Elements

const display = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn =  document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// Add event listeners for numbers, operators, decimals

inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {

        inputBtn.addEventListener("click", function(e) {
            numberClicked(e.target.value);
        });

    } else if(inputBtn.classList.contains("operator")) {

        inputBtn.addEventListener("click", function(e) {
            operatorClicked(e.target.value);
        });

    } else if(inputBtn.classList.contains("decimal")) {

        inputBtn.addEventListener("click", decimalclicked);

    }
});

const calculate = {
    "/" : (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*" : (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+" : (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-" : (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=" : (firstNumber, secondNumber) => secondNumber,
};

function numberClicked(number) {
    if(awaitingNextValue === true) {
        display.textContent = number;
        awaitingNextValue = false;
    } else {
        if(display.textContent === "0") display.textContent = number;
        else display.textContent += number;
    }
}

function operatorClicked(operator) {
    let currentValue = Number(display.textContent);

    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    } 
    
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }

    awaitingNextValue = true;
    operatorValue = operator;
}

function decimalclicked() {
    if(display.textContent.includes(".")) return;
    else display.textContent += ".";
}

function reset() {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    display.textContent = "0";
}

clearBtn.addEventListener("click", reset);