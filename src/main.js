
const currentYear = document.getElementById("current-year");
const scoresContainer = document.getElementById("scores");

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

const computerDisplay = document.getElementById("computer-display");
const playerDisplay = document.getElementById("player-display");
const gameResults = document.getElementById("game-results");

let computerScore = 0;
let playerScore = 0;
const choices = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
}

const defaultChoice = "scissors";
computerDisplay.textContent = choices[defaultChoice];
playerDisplay.textContent = choices[defaultChoice];
gameResults.textContent = "It's a draw";

currentYear.textContent = ` ${new Date().getFullYear()} `;

const choicesDOM = document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        // alert("I was clicked")
        const playerChoice = this.getAttribute("data-choice");
        // console.log(`player choice ${playerChoice}`);
        playGame(playerChoice);
    })
})

resetBtn.addEventListener("click", function(e) {
    e.preventDefault();
    resetGame()
});

function updateScores() {
    scoresContainer.textContent = `Computer ${computerScore} - ${playerScore} Player`
}

function playGame(playerChoice) {
    const choiceKeys = Object.keys(choices);
    const computerChoice = choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
    playerDisplay.textContent = choices[playerChoice];
    computerDisplay.textContent = choices[computerChoice];

    const results = getResults(playerChoice, computerChoice);
    computerScore = results.computer;
    playerScore = results.player;
    gameResults.textContent = results.result;
    gameResults.style.display = "block";
    updateScores();
}

function getResults(playerMove, computerMove) {
    if(playerMove === computerMove) {
        return {
            result: "It's A Draw",
            player: playerScore + 0,
            computer: computerScore + 0
        }
    }
    if(
        (playerMove === "rock" && computerMove === "scissors") || 
        (playerMove === "scissors" && computerMove === "paper") ||
        (playerMove === "paper" && computerMove === "rock")) 
    {
        //player wins
        return {
            result: "Player Wins",
            player: playerScore + 1,
            computer: computerScore + 0
        }
    }
    //player lost; computer won
    return {
        result: "Computer Wins",
        computer: computerScore + 1,
        player: playerScore + 0
    }
}

function resetGame() {
    computerScore = 0;
    playerScore = 0;
    updateScores();
}