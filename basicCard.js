
	var inquirer = require("inquirer");
	var fs = require("fs");

	var cardData = require("./front.json")

	function BasicCard(frontSide,backSide){
		this.front = frontSide;
		this.back  = backSide;
	}

	function createNewCard(){
		inquirer.prompt([{
			type:"input",
			name:"frontSide",
			message:"What is the question ?"
		},{
			type:"input",
			name:"backSide",
			message:"What is the answer ? "
		}
		]).then(function(inputs){
			var card = new BasicCard(inputs.frontSide, inputs.backSide);
			cardData.push(card);
			var newCardData = JSON.stringify(cardData, null, 2);
			fs.writeFile('./front.json',newCardData,function(err){
				if(err)throw err;
				console.log("Done");
			});			
		});
	}

	createNewCard();


