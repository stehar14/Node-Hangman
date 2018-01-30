// Node Hangman
// Steve Harold (stehar14)

// Require inquirer
var inquirer = require('inquirer');

// Require exports
var Word = require('./word.js');
var wordbank = require('./wordbank.js');

// Main hangman object
var hangman = {
// Exporting wordbank from wordbank.js
    wordBank: wordbank.wordbank.wordList,
// Initialize total guesses
    guessesRemaining: 5,
// Empty array to hold letters guessed by user. And checks if the user guessed the letter already
    guessedLetters: [],
// Initiate variable to hold randomly selected word
    currentWord: "",
// Function to prompt user to indicate if they are ready to play
    startGame: function() {
// Reference to this for use in functions
        
// Clears guessedLetters before a new game starts if it's not already empty.
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }
        console.log("Let's play some Sports Hangman on the CLI using node enabled JS. You ready?")
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Ready to play?"
        }]).then(function(answer) {
            if (answer.play) {
                hangman.newGame();
            } else {
                console.log("Okay, just run the program again if you change your mind...");
            }
        });
    },
// If they want to play, starts new game.
    newGame: function() {
        if (this.guessesRemaining === 5) {
            console.log("Play Ball!");
            console.log("-----------------------------------------------");
// Picks random word from wordbank
            this.currentWord = new Word(this.wordBank[Math.floor(Math.random()*this.wordBank.length)]);
            this.currentWord.makeLetters();
// Displays current word as blanks.
            console.log(this.currentWord.displayWord());
            this.promptUser();
        } else {
            this.resetGuessesRemaining();
            this.newGame();
        }
    },

    resetGuessesRemaining: function() {
        this.guessesRemaining = 5;
    },
// Function to prompt user for letter
    promptUser : function() {
        var hangman = this;
// Prompts player for a letter
        inquirer.prompt([{
            name: "userLetter",
            type: "input",
            message: "Choose a letter:",
        }]).then(function(letter) {
// Since wordbank is all lowercase, convert userLetter to lowercase
            var letterReturned = (letter.userLetter).toLowerCase();
// Check to see if userLetter has been guessed
            var guessedAlready = false;
            for (var i = 0; i<hangman.guessedLetters.length; i++) {
                if (letterReturned === hangman.guessedLetters[i]) {
                    guessedAlready = true;
                }
            }
// If the letter wasn't already guessed, add it to guessed letters and check if in chosen word
            if (guessedAlready === false) {
                hangman.guessedLetters.push(letterReturned);
                var found = hangman.currentWord.checkIfLetterFound(letterReturned);
// If letter doesn't match, tell user they were wrong
                if (found === false) {
                    console.log('Nope! You guessed wrong.');
                    hangman.guessesRemaining--;
                    console.log('Guesses remaining: ' + hangman.guessesRemaining);
                    console.log('\n*******************');
                    console.log(hangman.currentWord.displayWord());
                    console.log('\n*******************');
                    console.log("Letters guessed: " + hangman.guessedLetters);
                } else {
// User guessed correctly
                    console.log('Yes! You guessed right!');
// Checks to see if user won
                    if (hangman.currentWord.isWordGuessed() === true) {
// If user won, log congratulations and run startGame()                        
                        console.log(hangman.currentWord.displayWord());
                        console.log('Congratulations! You won the game!!!');
                    } else {
// Continue playing
                        console.log('Guesses remaining: ' + hangman.guessesRemaining);
                        console.log(hangman.currentWord.displayWord());
                        console.log('\n*******************');
                        console.log("Letters guessed: " + hangman.guessedLetters);
                    }
                }
// Continue prompting user while word isn't guessed and there are still guesses remaining
                if (hangman.guessesRemaining > 0 && hangman.currentWord.wordGuessed === false) {
                    hangman.promptUser();
                } else if (hangman.guessesRemaining === 0) {
// If user runs out of guesses, display game over message and run startgame()
                    console.log('Game over!');
                    console.log('The word you were guessing was: ' + hangman.currentWord.word);
                } else {
// Else display message saying user already picked letter
                    console.log("You've guessed that letter already. Try again.")
                    hangman.promptUser();
                }
            };
        });
    }
};

// Run game initially
hangman.startGame();