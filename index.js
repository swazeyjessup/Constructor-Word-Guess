var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var harryPotterCharacters = [
    "hermione granger",
    "harry potter",
    "lond voldemort",
    "draco malfoy",
    "severus snape",
    "ron weasley",
    "albus dumbledore",
    "rubeus hagrid",
    "dobby",
    "ginny weasley",
    "sirius black",
    "luna lovegood",
    "bellatrix lestrange",
    "remus lupin",
    "neville longbottom",
    "minerva mcgonagall",
    "dolores umbridge",
    "hedwig",
    "nymphadora tonks",
    "peter pettigrew",
    "james potter",
    "alastor moody",
    "lily potter",
    "viktor krum",
    "sybill trelawney",
    "moaning myrtle",
    "petunia dursley",
    "dudley dursley",
    "quirinus quirrell",
    "lucius malfoy",
    "vernon dursley"

];

var randomIndex = Math.floor(Math.random() * harryPotterCharacters.length);
var randomWord = harryPotterCharacters[randomIndex];

computerWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function knowledge(){

    if (requireNewWord){
        var randomIndex = Math.floor(Math.random() * harryPotterCharacters.length);
        var randomWord = harryPotterCharacters[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input){
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1){
                    console.log("\nPlease try again!\n");
                    knowledge();
                }else{

                    if(incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""){
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    }else {
                        var wordCheckArray = [];

                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if(wordCheckArray.join('') === wordComplete.join('')){
                            console.log("\Incorrect\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        }else {
                            console.log("\nCorrect!\n");

                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();

                        console.log("Guesses Left: " + guessesLeft + "\n");

                        console.log("letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0){
                            knowledge();
                        }else{
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    }else {
        console.log("YOU WIN!\n");
        
        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ])
    .then(function(input){
        if (input.restart === "Play Again"){
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            knowledge();
        }else{
            return 
        }
    })
}

knowledge();