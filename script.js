'use strict';


// Get Elements //
const timer = document.getElementById("timer");
const outlineBox = document.getElementById("outlineBox");
const target = document.getElementById("clickMe");
const startBtn = document.getElementById("start");
const countdown = document.getElementById("countdown");
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const endBtns = document.getElementById("endButtons");
const restartBtn = document.getElementById("restart");
const downloadDataBtn = document.getElementById("downloadData");
const modalHeader = document.getElementById("modalHeader");
const modalText = document.getElementById("modalWindowText");

// Variables //
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let allData = JSON.parse(localStorage.getItem("allData"));
if (allData === null) {
    allData = [];
}
let currentData = {};

let roundCounter = 0;
let rounds = [
    {
        name: "No Music",
        vocals: false,
        song: null,
    }, {
        name: "Hip-Hop",
        vocals: true,
        song: "hiphop.mp3", //In My Head juice WRLD clean
    }, {
        name: "Classical",
        vocals: false,
        song: "classical.mp3", //Eine kleine Nachtmusik
    }, {
        name: "Pop",
        vocals: true,
        song: "pop.mp3", //Dance the Night
    }, {
        name: "Lofi",
        vocals: false,
        song: "lofi.mp3", //Aso caught in the rain
    }, {
        name: "Country",
        vocals: true,
        song: "country.mp3", //Reba McEntire - Fancy
    }, {
        name: "EDM",
        vocals: false,
        song: "edm.mp3", //Disfigure - Blank [NCS Release]
    }, {
        name: "Metal",
        vocals: true,
        song: "metal.mp3", //Master of puppets
    }, {
        name: "Jazz",
        vocals: false,
        song: "jazz.mp3", // "Take Five" by Dave Brubeck Quartet
    }, {
        name: "Opera",
        vocals: true,
        song: "opera.mp3", //Puccini - Turandot: Nessun Dorma
    }
];
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
rounds = shuffle(rounds);
let targetCounter = 0;
let currentRound;
let startTime;

// Main Runtime Logic //
async function startRound() {
    //Start playing music
    let lastRoundIndex = rounds.length - 1;
    currentRound = rounds[lastRoundIndex];
    if (currentRound.name != "No Music") {
        audioSource.src = currentRound.song;
        audioPlayer.load(); // Reload the audio element with the new source
        audioPlayer.play(); // Start playing the new audio
    }
    rounds.pop(); //Remove that genre of music from the list to avoid repeats;

    //Wait 5 seconds before starting
    countdown.classList.remove("hidden");
    if (currentRound.name != "No Music") {
        startBtn.classList.add("hidden"); //Hide Start Button
        for(let i = 5; i > 0; i--) {
            countdown.textContent = `${i}`;
            await new Promise((resolve) => setTimeout(() => {resolve();}, 1000));
        }
    }
    closeModal();
    countdown.classList.add("hidden");
    startTime = Date.now();
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
    audioPlayer.pause();

    //Get round time and save into data array
    let totalTime = Date.now() - startTime - 10000; //The 10000 is the amount of milliseconds spent between spawning each target
    totalTime = totalTime * 0.001; //Convert ms to s
    currentData[`${currentRound.name}Time`] = totalTime;

    //Reset Values
    targetCounter = 0;

    //If no more rounds, end game and save currentData and allData into local storage
    if (rounds.length === 0) {
        allData.push(currentData);
        localStorage.setItem("allData", JSON.stringify(allData));
        modalWindow.classList.remove('hidden');
        overlay.classList.remove("hidden");
        endBtns.classList.remove("hidden");
        modalHeader.textContent = "Congratulations, you've finished the experiment!"
        modalText.innerHTML = "Thank you for your participation!<br><br>Click the restart button to reset for a new player or click the download button to generate a data file to send to Andrew."
        return;
    }

    //Start next round with popup
    showModal();
}

function selectRandomMusic() {
    let lastRoundIndex = rounds.length - 1;
    let currentRound = rounds[lastRoundIndex];
    return currentRound;
}


// Target Handling Functions //
function showTarget() {
    target.classList.remove("hidden");

    //Add the letter to be clicked to the middle of the target
    let letter = document.createElement("p");
    letter.textContent = targetKey;
    target.appendChild(letter);
}   

function hideTarget() {
    //Destroy child of target
    let letter = target.children[0];
    if (letter && letter.parentNode) {
        letter.parentNode.removeChild(letter);
    }
    
    target.classList.add("hidden");
}

let targetKey = "B"; //Set a default value in case target key is set improperly
function placeTarget() {
    //Get a random letter to press to "hit" target
    targetKey = alphabet[Math.floor(Math.random() * alphabet.length)];

    // Use setTimeout to execute placeTarget() after a 1s delay
    setTimeout(() => {
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
    }, 1000);
}

function targetClicked() {
    hideTarget();
    mouseInsideTarget = false;
    targetCounter++;
    roundRunning();
}

//Check if mouse is inside target 
let mouseInsideTarget = false;
target.addEventListener('mouseenter', () => {
    mouseInsideTarget = true;
});
target.addEventListener('mouseleave', () => {
    mouseInsideTarget = false;
});


// Modal Window Open and Close Functions //
function showModal() {
    //Set up text for each round
    let thisRound = selectRandomMusic();
    document.getElementById("roundMusic").textContent = thisRound.name; //Sets text in modal to display right music genre

    //Show the modal window
    modalWindow.classList.remove('hidden');
    overlay.classList.remove("hidden");
    startBtn.classList.remove("hidden");
};
showModal();

function closeModal() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
}


// Modal Window End of Experiment Button Functions //
function reloadPage() {
    location.reload();
}

function submitData() {
    if (prompt("Please enter session passcode") == 2814) {
        let addInfoHere = document.getElementById("formData"); //Get hidden form element
        addInfoHere.setAttribute("value", JSON.stringify(allData));
        document.getElementById("submitBtn").click(); //submit the form
    }
}

function dataToTxt() {
    if (prompt("Please enter session passcode") == 2814) {
        let readableData = JSON.stringify(allData);
        let blob = new Blob([JSON.stringify(readableData)], { type: 'text/plain' });
        let link = document.createElement('a');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', `experimentSessionData` + '.txt'); //concatenating the .txt is a redundancy
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


// Set up onclicks //
document.addEventListener('keydown', (e)=>{
    if((e.key === targetKey || e.key === targetKey.toLowerCase()) && mouseInsideTarget && !target.classList.contains("hidden")) {
        targetClicked();
    }
});
startBtn.onclick = startRound;
restartBtn.onclick = reloadPage;
downloadDataBtn.onclick = submitData;