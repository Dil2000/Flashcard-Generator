var cloze = function(text,cloze){

	this.front = text;
	this.cloze = this.text.match(/\(([^)]+)\)/)[1];
	this.printCloze = function(){
		console.log(this.cloze);
	}
	this.printFront = function(){
		console.log(this.front);
	}
	this.message = this.front.replace('(' + this.cloze +')','. . .');
}

cloze.prototype.printAnswer = function(){
	console.log('Incorrect, Here is the correct sentence : \n' + this.front.replace(/[{()}]/g, ''));
}

module.exports = cloze;