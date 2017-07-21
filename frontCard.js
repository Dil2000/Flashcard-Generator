var Front = function(front,back){
	this.front = front;
	this.back = back;
}

Front.prototype.printCard = function(){
	console.log('Front : '+ this.front + ', ' + 'Back: ' + this.back);
};

Front.prototype.printFront = function(){
	console.log(this.front);
}

Front.prototype.printAnswer = function(){
	console.log('Wront Answer - Correct Answer is '+ this.back + '.');
}

module.exports = Front;
