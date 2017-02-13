var Dirc = {
	RIGHT: 39,
	LEFT: 37,
	UP: 38,
	DOWN: 40,
};
var Snake = function(node){
	this.head = node;
	this.tail = node;
	this.size = 1;
}

var Node = function(size , row , col , dirc){
	this.size = size;
	this.row = row;
	this.col = col;
	this.x = col * size + 20;
	this.y = row * size + 20;
	this.dirc = dirc;
	this.next = null;
	this.prev = null;
};
Snake.prototype = {
	init:function(size){
		for(var i= 0 ; i< size; i++){
			this.addToTail(this.head.dirc);
		}
	},
	draw : function(context){
		if(this.size == 0) return;
		context.fillStyle = "#000000";
		for(var n =this.head ; n != null ; n = n.next){
			context.beginPath();
			context.fillRect(n.x , n.y , n.size , n.size);
		}
	},
	addToHead : function(dirc){
		var node = null;
		switch(dirc){
			//Left
			case Dirc.LEFT:
				node = new Node(10, this.head.row , this.head.col - 1 , dirc);
				break;
			//UP
			case Dirc.UP:
				node = new Node(10, this.head.row - 1 , this.head.col , dirc);
				break;
			//Right
			case Dirc.RIGHT:
				node = new Node(10 , this.head.row , this.head.col + 1 , dirc);
				break;
			//Down
			case Dirc.DOWN:
				node = new Node(10, this.head.row + 1 , this.head.col , dirc);
				break;
		}
		node.next = this.head;
		this.head.prev = node;
		this.head = node;
		this.size ++;
	},
	addToTail : function(){
		var node = null;
		var dirc = this.tail.dirc;
		switch(dirc){
			//Left
			case Dirc.LEFT:
				node = new Node(10, this.tail.row , this.tail.col + 1 , dirc);
				break;
			//UP
			case Dirc.UP:
				node = new Node(10, this.tail.row + 1 , this.tail.col , dirc);
				break;
			//Right
			case Dirc.RIGHT:
				node = new Node(10 , this.tail.row , this.tail.col - 1 , dirc);
				break;
			//Down
			case Dirc.DOWN:
				node = new Node(10, this.tail.row - 1 , this.tail.col , dirc);
				break;
		}
		this.tail.next = node;
		node.prev = this.tail;
		this.tail = node;
		this.size ++;
	},
	removeTail : function(){
		if(this.size == 1) return;
		this.tail = this.tail.prev;
		this.tail.next = null;
	},
	move: function(dirc){
		this.addToHead(dirc);
		this.removeTail();
	},
	eat: function(dirc){
		this.addToTail(dirc);
	},
	hitSelf: function(){
		if(this.size <= 1) return;
		for(var n =this.head.next; n != null ; n = n.next){
			if(n.col === this.head.col && n.row === this.head.row){
				return true;
			}
		}
		return false;
	}
};