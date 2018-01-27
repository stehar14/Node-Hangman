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
  currentWord: null,
  // Function to prompt user to indicate if they are ready to play
  startGame: function() {
    // Reference to this for use in functions
    var that = this;
    //clears guessedLetters before a new game starts if it's not already empty.
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }
    console.log("Let's play some Sports Hangman on the CLI using node enabled JS. You ready?")
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Okay, just run the program again if you change your mind...");
      }
    })},
  // If they want to play, starts new game.
  newGame: function() {
    if(this.guessesRemaining === 5) {
      console.log("Play Ball!");
      console.log("-----------------------------------------------");
      // Picks random word from wordbank
      this.currentWord = new Word(this.wordBank[Math.floor(Math.random()*this.wordBank.length)]);
      this.currentWord.makeLetters();
      // Displays current word as blanks.
      console.log(this.currentWord.displayWord());
      this.promptUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 5;
  },
  promptUser : function(){
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      
      }]).then(function(ltr) {
      //toUpperCase because words in word bank are all caps
      var letterReturned = (ltr.chosenLtr).toLowerCase();
      //adds to the guessedLetters array if it isn't already there
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
          //if none were found tell user they were wrong
          if(found === false){
            console.log('Nope! You guessed wrong.');
            that.guessesRemaining--;
            
            console.log('Guesses remaining: ' + that.guessesRemaining);
            
            console.log('\n*******************');
            console.log(that.currentWord.displayWord());
            console.log('\n*******************');

            console.log("Letters guessed: " + that.guessedLetters);
          } else {
            console.log('Yes! You guessed right!');
              //checks to see if user won
              if(that.currentWord.isWordGuessed() === true){
                console.log(that.currentWord.displayWord());
                console.log('Congratulations! You won the game!!!');
                hangman.startGame();
              } else{
                // display the user how many guesses remaining
                console.log('Guesses remaining: ' + that.guessesRemaining);
                console.log(that.currentWord.displayWord());
                console.log('\n*******************');
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordGuessed === false) {
            that.promptUser();
          }else if(that.guessesRemaining === 0){
            console.log('Game over!');
            console.log('The word you were guessing was: ' + that.currentWord.word);
          }
        } else{
            console.log("You've guessed that letter already. Try again.")
            that.promptUser();
          }
    });
  }
}

hangman.startGame();