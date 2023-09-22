'use strict';


// Get Elements //
const timer = document.getElementById("timer");
const outlineBox = document.getElementById("outlineBox");
const target = document.getElementById("clickMe");


// Variables //
let roundCounter = 0;
let rounds = [
    {
        name: "Control",
        vocals: false,
        song: null,
    }, {
        name: "Hip-Hop",
        vocals: true,
        song: "string",
    }, {
        name: "Classical",
        vocals: false,
        song: "string",
    }, {
        name: "Pop",
        vocals: true,
        song: "string",
    }, {
        name: "Lofi",
        vocals: false,
        song: "string",
    }, {
        name: "Country",
        vocals: true,
        song: "string",
    }, {
        name: "EDM",
        vocals: false,
        song: "string",
    }, {
        name: "Metal",
        vocals: true,
        song: "string",
    }, {
        name: "Jazz",
        vocals: false,
        song: "string",
    }, {
        name: "Opera",
        vocals: true,
        song: "string",
    }
];
let targetCounter = 0;


// Main Runtime Logic //
function startRound() {
    //when start button clicked
    //determine which round to play
    roundRunning();
}

function roundRunning() { //Runs every time a start button is clicked or 
    if (targetCounter < 10) {
        placeTarget();
    } else {
        roundEnd();
    }   
}

function roundEnd() {
    //Round end logic
    startRound();
}

// Target Handling Functions //
function showTarget() {
    target.style.display = "";
}   

function hideTarget() {
    target.style.display = "none";
}

function placeTarget() {
    //Wait random amount of seconds

    
    //Reveal target to subject
    showTarget(); //Must be done before moving target in order for calcs to be done right. No perceivable difference

    //At the same time, put the target in a random spot in the box
    let maxTop = outlineBox.clientHeight - clickMe.clientHeight;
    let maxLeft = outlineBox.clientWidth - clickMe.clientWidth;

    //Generate random top and left values within outline box
    let randomTop = Math.floor(Math.random() * maxTop);
    let randomLeft = Math.floor(Math.random() * maxLeft);

    //Set the top and left properties of clickMe
    clickMe.style.top = randomTop + 'px';
    clickMe.style.left = randomLeft + 'px';
}

function targetClicked() {
    hideTarget();
    //Score incrementing here
    targetCounter++;
    roundRunning();
}


// Modal Window Open and Close Functions //
function showModal() {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove("hidden");
};

function closeModal() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
}


// Set up onclicks //
target.onclick = targetClicked;