let secretNumber1, secretNumber2, currentPlayer, player1Name, player2Name;

function startGame(mode) {
  if (mode === 'single') {
    secretNumber1 = generateNumber();
    secretNumber2 = generateNumber();
    currentPlayer = 'player1';
  } else if (mode === 'multiplayer') {
    document.getElementById('player2').style.display = 'block';
    player1Name = prompt("Player 1, enter your name:");
    player2Name = prompt("Player 2, enter your name:");
    secretNumber1 = prompt(player1Name + ", enter your secret number (4-digit number with no repeating digits):");
    secretNumber2 = prompt(player2Name + ", enter your secret number (4-digit number with no repeating digits):");
    currentPlayer = 'player1';
  }
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
}

function generateNumber() {
  let number = '';
  for (let i = 0; i < 4; i++) {
    let digit = Math.floor(Math.random() * 9) + 1;
    while (number.includes(digit)) {
      digit = Math.floor(Math.random() * 9) + 1;
    }
    number += digit;
  }
  return number;
}

function checkGuess(secret, guess) {
  let numCorrect = 0;
  let posCorrect = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      posCorrect++;
    }
    if (secret.includes(guess[i])) {
      numCorrect++;
    }
  }
  return [numCorrect, posCorrect];
}

function guess(player) {
  let secret, inputId;
  if (player === 'player1') {
    secret = secretNumber2;
    inputId = 'player1Guess';
  } else {
    secret = secretNumber1;
    inputId = 'player2Guess';
  }
  let guess = document.getElementById(inputId).value;
  if (guess.length !== 4 || new Set(guess).size !== 4) {
    alert('Please enter a 4-digit number with no repeating digits.');
    return;
  }
  let result = checkGuess(secret, guess);
  document.getElementById('output').innerHTML = `${player === 'player1' ? player1Name : player2Name} guessed ${guess}. ${result[0]} numbers correct, ${result[1]} in the correct position.`;
  if (result[0] === 4 && result[1] === 4) {
    document.getElementById('output').innerHTML += `<br>${player === 'player1' ? player1Name : player2Name} wins!`;
  }
  addToGuessesTable(player, guess, result[0], result[1]);
  currentPlayer = (player === 'player1') ? 'player2' : 'player1';
}

function addToGuessesTable(player, guess, numCorrect, posCorrect) {
  let table = document.getElementById('guesses-body');
  let row = table.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = (player === 'player1') ? player1Name : player2Name;
  cell2.innerHTML = guess;
  cell3.innerHTML = numCorrect;
  cell4.innerHTML = posCorrect;
}
