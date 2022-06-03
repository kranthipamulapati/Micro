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

const display = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn =  document.getElementById("clear-btn");

let nextValue = 0;
let currentValue = 0;
let initialValue = 0;
let operatorValue = "";

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

        inputBtn.addEventListener("click", addDecimal);

    }
});

function numberClicked(number) {
    if(display.textContent === "0") display.textContent = number;
    else display.textContent += number;
}

function operatorClicked(operator) {
    currentValue = Number(display.textContent);
    if(initialValue === 0) {
        initialValue = currentValue;
    }
    operatorValue = operator;
}

function addDecimal() {
    if(display.textContent.includes(".")) return;
    else display.textContent += ".";
}

function reset() {
    nextValue = 0;
    currentValue = 0;
    initialValue = 0;
    operatorValue = "";
    display.textContent = "0";
}

clearBtn.addEventListener("click", reset);