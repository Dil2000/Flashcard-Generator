var frontCard = require("./frontCard.js");
var Cloze = require("./clozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var correct = 0;
var wrong = 0;
var cardArray = [];

// var flashCards = () => {
// 	inquirer.prompt([{
// 		type:"list",
// 		name:'unserType',
// 		message: ' What would you like to do?',
// 		choices:['create cards', 'create-cloze-cards', 'basic-quiz', 'cloze-quiz', 'quit']
// 	}
// 	]).then(function(choice){
// 		if (choice.userType === 'create-basic-cards') {
//             readCards('front.txt');
//             createCards(basicPrompt, 'front.txt');
//         } else if (choice.userType === 'create-cloze-cards') {
//             readCards('cloze.txt');
//             createCards(clozePrompt, 'cloze.txt');
//         } else if (choice.userType === 'basic-quiz') {
//             quiz('front.txt', 0);
//         } else if (choice.userType === 'cloze-quiz') {
//             quiz('cloze.txt', 0);
//         } else if (choice.userType === 'quit') {
//             console.log('Thanks for playing!');
//         }
// 	});
// }

// 	var readCards = (logfile) => {
// 		cardArray = [];
// 		fs.readFile(logFile,"utf8",function(error,data){
// 			var jsonContent = JSON.parse(data);

// 			for(var i = 0 ; i < jsonContent.length; i++){
// 				cardArray.push(jsonContent[i]);
// 			}
// 		})
// 	}

// 	var createCards = function(){

// 	}


	quiz = function(logFile,x){
		fs.readFile(logFile,"utf8",function(error,data){
			var jsonContent = JSON.parse(data);
			
			if(x < jsonContent.length){
				if(jsonContent[x].hasOwnProperty("front")){
					var gameCard = new frontCard(jsonContent[x].front,jsonContent[x].back);
					console.log("game card " + gameCard);
					var gameQuestion = gameCard.front;
					console.log("game question " + gameQuestion);
					var gameAnswer = gameCard.back.toLowerCase();
					console.log("game answer " + gameAnswer);
				}
				else {
					var gameCard = cloze(jsonContent[x].text, jsonContent[x].cloze);
					console.log("game card " + gameCard);
					var gameQuestion = gameCard.message;
					console.log("game question " + gameQuestion);
					var gameAnswer = gameCard.cloze.toLowerCase();
					console.log("game answer " + gameAnswer);
				}

				inquirer.prompt([{
					name:"question",
					message:"Game Question"
					// validate: function(value){
					// 	if (value.length > 0){
					// 		return true;							
					// 	}
					// 	return 'Guess again ! ';
					// }
				}]).then(function(answers){
						if(answers.question.toLowerCase().indexof(gameAsnwer) > -1){
							console.log('Correct ! ');
							correct++;
							x++;
							quiz(logFile,x);
						} else {
							gameCard.printAnswer();
							wrong++;
							x++;
							quiz(logFile,x);
						}
				})
			} else {

				console.log(" Correct Answer is ");
				console.log('correct : ' + correct);
				console.log('wrong : ' + wrong);
				correct = 0;
				wrong = 0;
				// flashCards();				
			}

		});
	};





	quiz('front.txt', 0);






