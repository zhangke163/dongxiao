var Food = function(row , col){
	this.row = row;
	this.col = col;
	this.size = 10;
	this.x = col * this.size + 20;
	this.y = row * this.size + 20;
	this.size = 10;
};

Food.prototype = {
	draw : function(context){
		context.beginPath();
		context.fillStyle = "#990000";
		context.fillRect(this.x , this.y , this.size , this.size);
	}
};