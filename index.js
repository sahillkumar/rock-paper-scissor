const choices = ["rock", "paper", "scissors"];
const WON_TEXT = "WON!";
const LOST_TEXT = "LOST!";
const DEFAULT_HEADER_TEXT = "First to 5 Wins, Try Your Luck !";
const images = {
  rock: "./images/rock.svg",
  paper: "./images/paper.svg",
  scissors: "./images/scissors.svg",
};

let humanScore = 0;
let computerScore = 0;
let roundNumber = 0;
let computerChoice;
let humanChoice;

const selections = document.querySelector("#selections");
const restartBtn = document.querySelector(".restart");
const result = document.querySelector(".result");
const humanScoreNode = document.getElementById("humanScore");
const compScoreNode = document.querySelector("#computerScore");
const alert = document.querySelector("#alert");
const round = document.querySelector(".round");
const resultSection = document.querySelector(".resultSection");
const humanSelectionArea = document.getElementById("humanSelection");
const compSelectionArea = document.getElementById("compSelection");

const displaySelectionEvent = new CustomEvent("displaySelection");

function displayImage(containerNode, imgSrc) {
  const img = document.createElement("img");
  img.src = imgSrc;
  while (containerNode.firstChild) {
    containerNode.removeChild(containerNode.firstChild);
  }
  containerNode.appendChild(img);
}

window.addEventListener(
  "load",
  () => {
    alert.innerHTML = DEFAULT_HEADER_TEXT;
  },
  { once: true }
);

humanSelectionArea.addEventListener("displaySelection", () => {
  displayImage(humanSelectionArea, images[humanChoice]);
});

compSelectionArea.addEventListener("displaySelection", () => {
  displayImage(compSelectionArea, images[computerChoice]);
});

restartBtn.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  roundNumber = 0;
  resultSection.style.visibility = "hidden";
  humanScoreNode.textContent = humanScore;
  compScoreNode.textContent = computerScore;
  alert.textContent = DEFAULT_HEADER_TEXT;
  restartBtn.style.visibility = "hidden";
  while (humanSelectionArea.firstChild) {
    humanSelectionArea.removeChild(humanSelectionArea.firstChild);
  }
  while (compSelectionArea.firstChild) {
    compSelectionArea.removeChild(compSelectionArea.firstChild);
  }
  humanSelectionArea.textContent = "Your Selection";
  compSelectionArea.textContent = "Computer Selection";
});

selections.addEventListener("click", (e) => {
  const id = e.target?.id;
  if (!choices.includes(id)) return;
  humanChoice = id;
  computerChoice = getComputerChoice();

  playRound();
});

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return choices[random];
}

function playRound() {
  if (humanScore === 5 || computerScore === 5) return;
  let resultText = "";
  if (humanChoice === computerChoice) {
    resultText = "DRAW";
  } else if (humanChoice === "rock") {
    if (computerChoice === "paper") {
      computerScore += 1;
      resultText = LOST_TEXT;
    } else if (computerChoice === "scissors") {
      humanScore += 1;
      resultText = WON_TEXT;
    }
  } else if (humanChoice === "paper") {
    if (computerChoice === "rock") {
      humanScore += 1;
      resultText = WON_TEXT;
    } else if (computerChoice === "scissors") {
      computerScore += 1;
      resultText = LOST_TEXT;
    }
  } else if (humanChoice === "scissors") {
    if (computerChoice === "paper") {
      humanScore += 1;
      resultText = WON_TEXT;
    } else if (computerChoice === "rock") {
      computerScore += 1;
      resultText = LOST_TEXT;
    }
  }
  compSelectionArea.dispatchEvent(displaySelectionEvent);
  humanSelectionArea.dispatchEvent(displaySelectionEvent);
  afterEffects(resultText);
}

const afterEffects = (resultText) => {
  round.textContent = "Round - " + (roundNumber + 1);
  result.textContent = resultText;
  resultSection.style.visibility = "visible";
  humanScoreNode.textContent = humanScore;
  compScoreNode.textContent = computerScore;

  if (humanScore === 5 || computerScore === 5) {
    const round = document.querySelector(".round");
    round.textContent = "";
    restartBtn.style.visibility = "visible";
    if (humanScore === 5) {
      result.innerHTML = "Hurray <br/> You WON!";
    } else if (computerScore === 5) {
      result.innerHTML = "Oops <br/> You LOST!";
    }
  }
  roundNumber += 1;
};
