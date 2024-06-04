const choices = ["rock", "paper", "scissor"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return choices[random];
}

function getHumanChoice() {
  const userInput = prompt("rock, paper or scissor, what's your choice ?");
  return userInput;
}

function playRound(humanChoice, computerChoice) {
  const humanChoiceLowerCased = humanChoice?.toLowerCase();

  if (!choices.includes(humanChoiceLowerCased)) {
    alert("Invalid value");
    return;
  }
  if (humanChoiceLowerCased === computerChoice) {
    console.log("Oops, It's a draw");
  } else if (humanChoiceLowerCased === "rock") {
    if (computerChoice === "paper") {
      computerScore += 1;
      console.log("You Lose! Paper beats Rock");
    } else if (computerChoice === "scissor") {
      humanScore += 1;
      console.log("You Won! Rock beats scissor");
    }
  } else if (humanChoiceLowerCased === "paper") {
    if (computerChoice === "rock") {
      humanScore += 1;
      console.log("You Won! Paper beats Rock");
    } else if (computerChoice === "scissor") {
      computerScore += 1;
      console.log("You Lose! Paper beats Scissor");
    }
  } else if (humanChoiceLowerCased === "scissor") {
    if (computerChoice === "paper") {
      humanScore += 1;
      console.log("You Won! Scissor beats Paper");
    } else if (computerChoice === "rock") {
      computerScore += 1;
      console.log("You Lose! Rock beats scissor");
    }
  }
}

const playGame = () => {
  for (let i = 0; i < 5; i++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }
};

playGame();

console.table({
  "Human Score": humanScore,
  "Computer Score": computerScore,
});

const getWinner = () => {
  if (computerScore === humanScore) return "It's a drow";
  return computerScore > humanScore ? "Computer Wins" : "You Win";
};

const winner = getWinner();

console.log("%c", "color:red", winner);
