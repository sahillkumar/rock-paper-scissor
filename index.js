const choices = ["rock", "paper", "scissor"];

function getComputerChoice() {
  const random = Math.floor(Math.random() * 3);
  return choices[random];
}

function getHumanChoice() {
  const userInput = prompt("rock, paper or scissor, what's your choice ?");
  console.log(userInput);
}

console.log(getComputerChoice());

getHumanChoice();
