// Node Hangman
// Steve Harold (stehar14)

// Letter constructor
var Letter = function(letter) {
// Store the letter 
  this.letter = letter;
// Boolean value determining whether a letter displays as itself or an underscore
  this.appear = false;
// Function to render word with dashes as unguessed letters
  this.displayLetter = function() {
    if (this.appear === false) { 
      return ' _ ';
    } else { 
      return this.letter;
    }
  };
};

// Makes Letter() available in word.js
module.exports = Letter;