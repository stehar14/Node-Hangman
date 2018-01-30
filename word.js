// Node Hangman
// Steve Harold (stehar14)

// Require Letter contructor from letter.js
var Letter = require('./letter.js');

// Word constructor
function Word(word) {
// Reference to this for use in functions  
  var that = this;
// sets property equal to randomly selected word
  this.word = word;
  // array to hold letter objects
  this.letters = [];
  // Boolean value storing whether the word has been guessed
  this.wordGuessed = false;
  // Function to create a new Letter object for each letter in the random word
  this.makeLetters = function() {
    // Push new Letter objects to letters array
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  // Function to check to see if the word is guessed
  this.isWordGuessed = function() {
    if(this.letters.every(function(letter){
      return letter.appear === true;
    })){
      this.wordFound = true;
      return true;
    }
  };

  // Function to check to see if the user's guess matches any letters
  this.checkIfLetterFound = function(guessedLetter) {
    var letterFound = false;
    // Observes each letter to see if it matches the guessed letter
    this.letters.forEach(function(letter){
      // If letter matches guess, set appear property to true
      if(letter.letter === guessedLetter){
        letter.appear = true;
        letterFound = true;
      }
    })
    // Return variable that indicates whether letter was found
    return letterFound;
  };

  // function to concatenate the display of the random word in the console
  this.displayWord = function() {
    var display = '';
    // Display either the letter or an underscore for each character
    that.letters.forEach(function(letter){
      var currentLetter = letter.displayLetter();
      display+= currentLetter;
    });

    return display;
  };
}

// Makes Word() available for use in hangman.js
module.exports = Word;