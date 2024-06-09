const choices = ["rock", "paper", "scissor"];
const WON_TEXT = "You WON!";
const LOST_TEXT = "You LOSE!";
const DEFAULT_HEADER_TEXT = "First to 5 Wins, Try Your Luck !";

let humanScore = 0;
let computerScore = 0;
let round = 0;

const selections = document.querySelector("#selections");
const restartBtn = document.querySelector(".restart");
const winnerNode = document.querySelector(".winner");
const humanScoreNode = document.getElementById("humanScore");
const compScoreNode = document.querySelector("#computerScore");
const alert = document.querySelector("#alert");

window.addEventListener(
  "load",
  () => {
    alert.innerHTML = DEFAULT_HEADER_TEXT;
  },
  { once: true }
);

restartBtn.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  winnerNode.style.visibility = "hidden";
  humanScoreNode.textContent = humanScore;
  compScoreNode.textContent = computerScore;
  alert.textContent = DEFAULT_HEADER_TEXT;
  restartBtn.style.visibility = "hidden";
});

selections.addEventListener("click", (e) => {
  const id = e.target?.id;
  if (!choices.includes(id)) return;
  const humanChoice = id;
  const computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);
});

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return choices[random];
}

function playRound(humanChoice, computerChoice) {
  if (humanScore === 5 || computerScore === 5) return;

  let resultText = "";
  if (humanChoice === computerChoice) {
    resultText = "DRAW";
  } else if (humanChoice === "rock") {
    if (computerChoice === "paper") {
      computerScore += 1;
      resultText = LOST_TEXT;
    } else if (computerChoice === "scissor") {
      humanScore += 1;
      resultText = WON_TEXT;
    }
  } else if (humanChoice === "paper") {
    if (computerChoice === "rock") {
      humanScore += 1;
      resultText = WON_TEXT;
    } else if (computerChoice === "scissor") {
      computerScore += 1;
      resultText = LOST_TEXT;
    }
  } else if (humanChoice === "scissor") {
    if (computerChoice === "paper") {
      humanScore += 1;
      resultText = WON_TEXT;
    } else if (computerChoice === "rock") {
      computerScore += 1;
      resultText = LOST_TEXT;
    }
  }

  afterEffects(resultText);
}

const afterEffects = (resultText) => {
  winnerNode.textContent = resultText;
  winnerNode.style.visibility = "visible";
  humanScoreNode.textContent = humanScore;
  compScoreNode.textContent = computerScore;

  if (humanScore === 5) {
    restartBtn.style.visibility = "visible";
    winnerNode.innerHTML =
      "&#x1F389;&#x1F389; Congratulations, You Win  &#x1F389;&#x1F389;";
  } else if (computerScore === 5) {
    winnerNode.innerHTML = "OOps you lost";
    restartBtn.style.visibility = "visible";
  }
};

const displaySelectionEvent = new CustomEvent("displaySelection");
