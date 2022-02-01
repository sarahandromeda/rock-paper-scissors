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
}

// Functions to play a round
const roundDiv = document.querySelector("div.round");
const resultsDiv = document.querySelector(".results");

// Toggles round div to show or hide
const toggleRoundDiv = function () {
    roundDiv.classList.toggle("hide");
    resultsDiv.classList.toggle("hide");
};

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

// Helper function that adds weapon cards to round div
const addCards = function (userCard, computerCard) {
    let userWeapon = document.getElementById(`${userCard}`);
    userWeapon = userWeapon.cloneNode(true);
    userWeapon.classList.add("round");
    roundDiv.appendChild(userWeapon);

    let computerWeapon = document.querySelector(`#${computerCard}`);
    computerWeapon = computerWeapon.cloneNode(true);
    computerWeapon.classList.add("round");
    roundDiv.appendChild(computerWeapon);

    return [userWeapon, computerWeapon];
}

// Helper function returning center coordinates of layout
const centerCoordinates = function () {
    let centerCard = document.querySelector("#paper");
    centerCard = findPos(centerCard);
    return [centerCard[0] + 125, centerCard[1] + 125];
}

const moveAnimation = function (userPick, computerPick) {
    // Set initial positions
    const newCardElements = addCards(userPick, computerPick);
    const userCardElement = newCardElements[0];
    const computerCardElement = newCardElements[1];
    const centerElement = findPos(document.querySelector("#paper"));
    userCardElement.style.left = `${centerElement[0]}px`;
    userCardElement.style.top = `${centerElement[1]}px`;
    computerCardElement.style.left = `${centerElement[0]}px`;
    computerCardElement.style.top = `${centerElement[1]}px`;
    userCardElement.classList.add("user");
    computerCardElement.classList.add("computer"); 
    showWinner(userPick, computerPick);
}

// Helper function to display a div with the winner of round
const showWinner = function (userWeaponPick, computerWeaponPick) {
    let resultsText = document.createElement("p");
    resultsText.setAttribute("id", "winner");
    returnWinner(userWeaponPick, computerWeaponPick);
    if (winner == "user") {
     resultsText.textContent = "You Win!";
    } else if (winner == "computer") {
     resultsText.textContent = "Computer Wins!";
    } else {
     resultsText.textContent = "Draw!";
    }
    
    resultsDiv.appendChild(resultsText);
    resultsDiv.classList.remove("hide");
    setTimeout(() => {animateResults(resultsText)}, 500);
}

const animateResults = function (resultsPara) {
    resultsPara.classList.toggle("show");
}

// Resets round div to empty
const resetRound = function () {
    while (roundDiv.lastElementChild) {
        roundDiv.removeChild(roundDiv.lastElementChild)
    }
    while (resultsDiv.lastElementChild) {
        resultsDiv.removeChild(resultsDiv.lastElementChild)
    }
    roundDiv.style.display = "none";
    resultsDiv.style.display = "none";
};

// When results animation is finished reset divs
resultsDiv.addEventListener("transitionend", (e) => {
    if (e.propertyName == "font-size") {
        toggleRoundDiv();
    } else if (e.propertyName == "opacity") {
        resetRound();
        const finalUserScore = document.querySelector("#your-score").textContent;
        const finalComputerScore = 
                document.querySelector("#computer-score").textContent;
        const endDiv = document.querySelector(".end");
        if (finalUserScore == "5") {
            endDiv.style.zIndex = 2;
            endGame("you", endDiv);
        } else if (finalComputerScore == "5") {
            endDiv.style.zIndex = 2;
            endGame("computer", endDiv);
        }
    }
});

// Set event listener to each card to play round when clicked
const weapons = document.querySelectorAll(".cards img");
weapons.forEach(weapon => {
    weapon.addEventListener("click", () => {
        toggleRoundDiv();
        roundDiv.style.display = "flex";
        resultsDiv.style.display= "flex";
        const userSelection = weapon.getAttribute("id");
        const computerSelection = computer();
        moveAnimation(userSelection, computerSelection);
        returnWinner(userSelection,computerSelection);
        addPoint(winner);
    })
});

const toggleEnd = function () {
    const end = document.querySelector(".end");
    end.classList.toggle("hide");
}

// Display game winner
const endGame = function (victor, endContainer) {
    if (victor == "you") {
        endContainer.textContent = "Congrats! You win!";
    } else {
        endContainer.textContent = "Sorry, the computer won this time.";
    }
    
    const playAgain = document.createElement("button");
    playAgain.textContent = "Play Again?";
    endContainer.appendChild(playAgain);
    toggleEnd();
    playAgain.addEventListener("click", () => {
        let scores = document.querySelectorAll(".scores td");
        scores.forEach( (score) => {
            score.textContent = 0;
        })
        console.log(scores);
        toggleEnd();
        endContainer.style.zIndex = 0;
    })
}


    


