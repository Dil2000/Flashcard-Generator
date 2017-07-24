	var inquirer = require('inquirer');
	var fs = require('fs');
	var cardData = require('./cloze.json');

	function clozeCard(fullText,cloze){

		var clozePositions = clozeDelete(fullText,cloze);

		this.partial = getPartial(fullText,clozePositions);
		console.log("Partial   :     " + this.partial);

		this.cloze = cloze;
		console.log("Cloze     :     " + this.cloze);		               

		function clozeDelete(fullText,cloze){
			var start = fullText.indexOf(cloze);
			if(start !== -1){
				return [start,start + cloze.length];
			}
			throw new Error("Could not find");
		}

		function getPartial(fullText,clozePositions){
			var start = fullText.slice(0,clozePositions[0]);
			var end = fullText.slice(clozePositions[1],fullText.length);
			return start + " . . . " + end;
		}
	}

	clozeCard.prototype.displayCard = function displayCard(){
		console.log("Full Text :     "+ this.partial.replace(" . . . ",this.cloze));
	}

	function createNewCard(){
		inquirer.prompt([{
			type:"input",
			name:"fullText",
			message:"What is the full text of the flash card you want to make ?"
		},{
			type:"input",
			name:"cloze",
			message:"What is the cloze to the flash card ? "
		}
		]).then(function(inputs){
			
			var card = new clozeCard(inputs.fullText, inputs.cloze);			

			var createdFull = card.displayCard();
			
			cardData.push(card);
			var newCardData = JSON.stringify(cardData, null, 2);
			fs.writeFile('./cloze.json',newCardData,function(err){
				if(err)throw err;
				console.log("Done");
			});			
		});
	}

	module.exports = clozeCard;

	createNewCard();