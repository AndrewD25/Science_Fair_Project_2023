'use strict';


// Get Elements //
const timer = document.getElementById("timer");
const outlineBox = document.getElementById("outlineBox");
const target = document.getElementById("clickMe");
const startBtn = document.getElementById("start");
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

// Variables //
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


// Main Runtime Logic //
function startRound() {
    //Start playing music
    let lastRoundIndex = rounds.length - 1;
    let currentRound = rounds[lastRoundIndex];
    if (currentRound.name != "No Music") {
        audioSource.src = currentRound.song;
        audioPlayer.load(); // Reload the audio element with the new source
        audioPlayer.play(); // Start playing the new audio
    }
    rounds.pop(); //Remove that genre of music from the list to avoid repeats;

    //Wait 5 seconds before starting
    if (currentRound.name != "No Music") {
        setTimeout(() => {
            closeModal();
            roundRunning();
        }, 5000)
    } else {
        closeModal();
        roundRunning();
    }
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

    //Reset Values
    targetCounter = 0;

    let ms = document.getElementById("milliseconds");
    ms.textContent = "00";
    let s = document.getElementById("seconds");
    s.textContent = "00";
    let min = document.getElementById("minutes");
    min.textContent = "00";
    let hr = document.getElementById("hours");
    hr.textContent = "00";

    //Start next round with popup
    showModal();
}

function runTimer() {
    setTimeout(() => {
        let ms = document.getElementById("milliseconds");
        let s = document.getElementById("seconds");
        let min = document.getElementById("minutes");
        let hr = document.getElementById("hours");

        if (!target.classList.contains("hidden")) {
            let msCurrent = parseInt(ms.textContent);
            let sCurrent = parseInt(s.textContent);
            let minCurrent = parseInt(min.textContent);
            let hrCurrent = parseInt(hr.textContent);
        
            //Set timer
            if (msCurrent === 100) {
                ms.textContent = "0"
                if (sCurrent === 59) {
                    s.textContent = "0"
                    if (minCurrent === 59) {
                        min.textContent = "0"
                        hr.textContent = String(hrCurrent + 1);
                    } else {
                        min.textContent = String(minCurrent + 1);
                    }
                } else {
                    s.textContent = String(sCurrent + 1);
                }
            } else {
                ms.textContent = String(msCurrent + 5);
            }
        }   
        runTimer();
    }, 50)
}
runTimer();

function selectRandomMusic() {
    let lastRoundIndex = rounds.length - 1;
    let currentRound = rounds[lastRoundIndex];
    return currentRound;
}


// Target Handling Functions //
function showTarget() {
    target.classList.remove("hidden");
}   

function hideTarget() {
    target.classList.add("hidden");
}

function placeTarget() {
    // Generate a random delay between 0.5s and 2s (500ms and 2000ms)
    const delay = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

    // Use setTimeout to execute placeTarget() after the delay
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
    }, delay);
}

function targetClicked() {
    hideTarget();
    //Score incrementing here?
    targetCounter++;
    roundRunning();
}


// Modal Window Open and Close Functions //
function showModal() {
    //Set up text for each round
    let thisRound = selectRandomMusic();
    document.getElementById("roundMusic").textContent = thisRound.name; //Sets text in modal to display right music genre

    //Show the modal window
    modalWindow.classList.remove('hidden');
    overlay.classList.remove("hidden");
};
showModal();

function closeModal() {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
}


// Set up onclicks //
target.onclick = targetClicked;
startBtn.onclick = startRound;