// Intro animation  script with stop
const intro = document.querySelector(".intro");

const hideIntro = function () {
    intro.classList.toggle("hide");
};

intro.addEventListener("click", hideIntro);

intro.addEventListener("transitionend", () => {
    intro.removeEventListener("click", hideIntro);
    intro.style.display = "none";
    }
);

// Game play script

const possChoices = ['rock', 'paper', 'scissors'];

// Helper function to get computer choice
let computer = function() {
    let randomChoice = Math.floor(Math.random() * 3);
    let computerChoice = possChoices[randomChoice];;
    return computerChoice
};

// Helper function to determine winner 
let winner = "";
function returnWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return winner = "tie";
    } else if (userSelection === "rock") {
        if (computerSelection === "paper") {
            return winner = "computer";
        } else {
            return winner = "user"
        };
    } else if (userSelection === "paper") {
        if (computerSelection === "rock") {
            return winner = "user";
        } else {
            return winner = "computer";
        };
    } else {
        if (computerSelection === "rock") {
            return winner = "computer"
        } else {
            return winner = "user"
        };
    };
};

// Helper function to set score 
const addPoint = function (winner) {
    const yourScore = document.querySelector("#your-score");
    const computerScore = document.querySelector("#computer-score");
    if (winner == "user") {
        ++yourScore.textContent;
    } else if (winner == "computer") {
        ++computerScore.textContent;
    };
    // When someone reaches 5, reset scores, alert winner
    if (yourScore.textContent == 5) {
        alert("You win!");
        yourScore.textContent = 0;
        computerScore.textContent = 0;
    } else if (computerScore.textContent == 5) {
        alert("Computer Wins!");
        computerScore.textContent = 0;
        yourScore.textContent = 0;
    }
}

// Functions to play a round
const roundDiv = document.querySelector("div.round");

// Helper function to find original position of cards
const findPos = function (obj) {
    let currLeft = 0;
    let currTop = 0;
    if (obj.offsetParent) {
        do {
			currLeft += obj.offsetLeft;
			currTop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [currLeft,currTop];
}

// Helper function to move card from og position to new
const moveRoundCards = function (userPick, computerPick) {
    const newCardElements = addCards(userPick, computerPick);
    moveAnimation(newCardElements[0], newCardElements[1]);
}

// Helper function returning center coordinates of window
const centerCoordinates = function () {
    return [Math.round(window.innerWidth/2), Math.round(window.innerHeight/2)];
}

const moveAnimation = function (userCardElement, computerCardElement) {
    const center = centerCoordinates();
    // Set final positions
    const finalUserX = center[0]-250;
    const finalComputerX = center[0]+50;
    // Set initial positions 
    const initialUserCoordinates = findPos(userCardElement);
    let initialUserX = initialUserCoordinates[0];
    const initialComputerCoordinates = findPos(computerCardElement);
    let initialComputerX = initialComputerCoordinates[0];
    
    const animate = setInterval(frame);
    function frame() {
        if (initialUserX == finalUserX && 
                initialComputerX == finalComputerX) {
            clearInterval(animate);
        } else {
            if (initialUserX < finalUserX) {
                initialUserX++;
                userCardElement.style.left = `${initialUserX}px`;
            } else if (initialUserX > finalUserX) {
                initialUserX--;
                userCardElement.style.left = `${initialUserX}px`;
            }

            if (initialComputerX < finalComputerX) {
                initialComputerX++;
                computerCardElement.style.left = `${initialComputerX}px`;
            } else if (initialComputerX > finalComputerX) {
                initialComputerX--;
                computerCardElement.style.left = `${initialComputerX}px`;
            }
        }
    }
}

// Helper function that adds weapon cards to round div
const addCards = function (userCard, computerCard) {
    let userWeapon = document.getElementById(`${userCard}`);
    const userWeaponCoordinates = findPos(userWeapon);
    userWeapon = userWeapon.cloneNode(true);
    userWeapon.classList.add("round");
    userWeapon.style.left = `${userWeaponCoordinates[0]}px`;
    userWeapon.style.top = `${userWeaponCoordinates[1]}px`;
    roundDiv.appendChild(userWeapon);

    let computerWeapon = document.querySelector(`#${computerCard}`);
    const computerWeaponCoordinates = findPos(computerWeapon);
    computerWeapon = computerWeapon.cloneNode(true);
    computerWeapon.classList.add("round");
    computerWeapon.style.left = `${computerWeaponCoordinates[0]}px`;
    computerWeapon.style.top = `${computerWeaponCoordinates[1]}px`;
    roundDiv.appendChild(computerWeapon);

    return [userWeapon, computerWeapon];
}

// Resets round div to empty
const removeCards = function () {
    while (roundDiv.lastElementChild) {
        roundDiv.removeChild(roundDiv.lastElementChild)
    }
};

// Toggles round div to show or hide
const toggleRoundDiv = function () {
    roundDiv.classList.toggle("hide");
};

// Placeholder to make code workable for now
roundDiv.addEventListener("click", () => {
    toggleRoundDiv();
    removeCards();
});

// Set event listener to each card to play round when clicked
const weapons = document.querySelectorAll(".cards img");
weapons.forEach(weapon => {
    weapon.addEventListener("click", () => {
        toggleRoundDiv();
        console.log(weapon);
        const userSelection = weapon.getAttribute("id");
        console.log(userSelection);
        const computerSelection = computer();
        console.log(computerSelection);
        moveRoundCards(userSelection, computerSelection);
        returnWinner(userSelection,computerSelection);
        addPoint(winner);
    })
});
