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

// Functionality

let draggedItem = {};
let currentColumn = {};
let toDo = ["do something", "do otherthing", "do some otherthing", "do stuff", "do more stuff", "do whatever"], progress = [], complete = [], onhold = [];

function createListItem(item) {
    let element = document.createElement("li");
    element.classList.add("drag-item");
    element.textContent = item;
    element.draggable = true;
    element.setAttribute("ondragstart", "drag(event)");
    return element;
}

function appendListElement(element, id) {
    document.getElementById(id).appendChild(element);
}

toDo.forEach((item) => {
    let element = createListItem(item);
    appendListElement(element, "toDo-list");
});

function drag(e) {
    draggedItem = e.target;
}

function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(e) {
    currentColumn = e.target;
}

function drop(e) {
    e.preventDefault();
    currentColumn.appendChild(draggedItem);
}