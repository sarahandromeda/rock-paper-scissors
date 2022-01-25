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

// Set event listener to each cad to play round when clicked
const weapons = document.querySelectorAll(".cards img");
weapons.forEach(weapon => {
    weapon.addEventListener("click", () => {
        console.log(weapon);
        const userSelection = weapon.getAttribute("id");
        console.log(userSelection);
        const computerSelection = computer();
        console.log(computerSelection);
        returnWinner(userSelection,computerSelection);
        addPoint(winner);
    })
});
