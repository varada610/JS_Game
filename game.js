let targetNumber = generateNumber();
let attempts = [];
let gameOver = false;
let count = 0;

function generateNumber() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit) || (digits.length === 0 && digit !== 0)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

function validateGuess(guess) {
    if (!/^\d{4}$/.test(guess)) {
        displayMessage("Please enter a valid 4-digit number.");
    } else if (attempts.includes(guess)) {
        displayMessage("You already tried this number.");
        return;
    } else return true;
}

function getElementById(element) {
    return document.getElementById(element).value;
}

function processAGuess(guess) {
    if (!(validateGuess(guess))) return;

		let {cows, bulls} = checkCowsAndBulls(guess);
    let grading = "Cows: " + cows + "   Bulls: "+ bulls;
    attempts.push(guess);
    count += 1;
    const ulElement = document.getElementById("trials");
    const newListItem = document.createElement("li");
    newListItem.id = "li-" + (count.toString());
    newListItem.textContent = guess.toString() + "   " + grading;
    ulElement.appendChild(newListItem);

    document.getElementById("outerList").style.visibility = "visible";   

    if (bulls === 4) {
        displayMessage(`Congratulations! You guessed it: ${targetNumber}`);
        gameOver = true;
    } 
    
    if(count === 8) {
    	displayMessage(`Sorry, you have reached the maximum tries. The correct number was: ${targetNumber}. Play again!`);
    }
}

function submitGuess() {
    if (gameOver) return;

    let guess = getElementById("guessInput");

    processAGuess(guess);   
}

function checkCowsAndBulls(guess) {
    let cows = 0, bulls = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === targetNumber[i]) {
            bulls++;
        } else if (targetNumber.includes(guess[i])) {
            cows++;
        }
    }
    return { cows, bulls };
}

function giveUp() {
    displayMessage(`The correct number was: ${targetNumber}. Try again!`);
    gameOver = true;
}

function displayMessage(message) {
    document.getElementById("msg").innerHTML = message;
}
