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

const container = document.getElementById("container");

const dateInput = document.getElementById("countDown-date");
const reasonInput = document.getElementById("countDown-reason");

const resetBtn = document.getElementById("resetBtn");
const countDownForm = document.getElementById("countDownForm");
const countDownTimerTitle = document.getElementById("countDown-timer-title");

const infoContainer = document.getElementById("countDown-info-container");
const timerContainer = document.getElementById("countDown-timer-container");
const inputContainer = document.getElementById("countDown-input-container");

let countDownReason = "";
let countDownDate = "";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = 24 * hour;

let interval = {};

function showInfo() {
    document.getElementById("complete-info").textContent = `CountDown finished on ${countDownDate}`;   
}

function reset() {
    clearInterval(interval);
    window.location.reload();
}

function startTimer() {
    interval = setInterval(function() {
        showTimer();
    }, 1000);
}

function showTimer() {
    let now = new Date().getTime();
    let selected = new Date(countDownDate).getTime();
    let diff = selected - now;

    if(diff > 0) {
        let days = Math.floor(diff/day);
        let hours = Math.floor((diff % day)/hour);
        let minutes = Math.floor((diff % hour)/minute);
        let seconds = Math.floor((diff % minute)/second);
        
        countDownTimerTitle.textContent = countDownReason;
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        startTimer();
    } else {
        clearInterval(interval);
        timerContainer.setAttribute("hidden", true);
        infoContainer.removeAttribute("hidden");
        showInfo();
    }
}

function updateCountdown(e) {
    
    countDownReason = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    
    inputContainer.setAttribute("hidden", true);
    timerContainer.removeAttribute("hidden");

    showTimer();
}

let today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

countDownForm.addEventListener("submit", function(e) {
    e.preventDefault();
    updateCountdown(e);
});

container.addEventListener("click", function(e) {
    if(e.target.id === "resetBtn") reset();
    if(e.target.id === "newCountDownBtn") window.location.reload();
});