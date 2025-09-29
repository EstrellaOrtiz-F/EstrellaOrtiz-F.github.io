// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global variables
let randomNumber;
let attempts = 0;
let maxAttempts = 7;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("Random number: " + randomNumber);
  attempts = 0;

  // reset buttons
  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";

  // reset the input
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.value = "";
  playerGuess.focus();

  // reset feedback
  document.querySelector("#feedback").textContent = "";
  document.querySelector("#guesses").textContent = "";

  // reset attempts 
  document.querySelector("#attemptsLeft").textContent = maxAttempts;
}
function checkGuess() {
  let guess = Number(document.querySelector("#playerGuess").value);
  let feedback = document.querySelector("#feedback");

  console.log("Player guess: " + guess);

  if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "red";
    return;
  }

  attempts++;
  document.querySelector("#attemptsLeft").textContent = maxAttempts - attempts;

  if (guess == randomNumber) {
    feedback.textContent = "You guessed it! You won!";
    feedback.style.color = "darkgreen";
    wins++;
    document.querySelector("#wins").textContent = wins;
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == maxAttempts) {
      feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
      feedback.style.color = "red";
      losses++;
      document.querySelector("#losses").textContent = losses;
      gameOver();
    } else if (guess > randomNumber) {
      feedback.textContent = "Guess was high";
      feedback.style.color = "orange";
    } else {
      feedback.textContent = "Guess was low";
      feedback.style.color = "orange";
    }
  }
  document.querySelector("#playerGuess").value = "";
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");
  guessBtn.style.display = "none";  
  resetBtn.style.display = "inline";
}
