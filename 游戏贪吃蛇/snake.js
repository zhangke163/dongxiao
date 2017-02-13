function Function(box){
	this.box=box;
	this.snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	this.food={x:0,y:0};
	this.fx="right";
	this.fen=0;
	this.t=0;
	this.flag=false;
}
Function.prototype={
play:function(){
	this.draw();
	this.getsnake();
	this.getfood();
	this.move();
	clearInterval(this.t,100)
	this.kongzhi();
},
draw:function(){
	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 30; j++) {
			var div=$("<div>");
			div.id=i+"-"+j;
			this.box.appendChild(div);
		};
	};
},
getsnake:function(){
	for (var i = 0; i < this.snake.length; i++) {
		var sheid="#"+this.snake[i].x+"-"+this.snake[i].y;
		var sheobj=$(sheid);
		sheobj.className="she";
	};
},
getfood:function(){
	do{
		var x=parseInt(Math.random()*30);
		var y=parseInt(Math.random()*30);
		this.food.x=x;
		this.food.y=y;
	}while(this.checkfood(this.food.x,this.food.y))
	var foodid="#"+this.food.x+"-"+this.food.y;
	var foodobj=$(foodid);
	foodobj.className="food";
},
move:function(){
	var that=this;
	this.t=setInterval(zou,100);
	function zou(){
		switch(that.fx){
			case "right":
				var headid="#"+(that.snake[that.snake.length-1].x)+"-"+(that.snake[that.snake.length-1].y+1);
				var headobj=$(headid);
				if(headobj==null||that.checkfood(that.snake[that.snake.length-1].x,that.snake[that.snake.length-1].y+1)){
					that.gameover();
					clearInterval(that.t);
					return;
				}else{
					headobj.className="she";
					that.snake.push({x:that.snake[that.snake.length-1].x,y:that.snake[that.snake.length-1].y+1});
					if(that.snake[that.snake.length-1].x==that.food.x&&that.snake[that.snake.length-1].y==that.food.y){
						that.fen+=1;
						$("#fenshu").innerText=that.fen;
						that.getfood();
					}else{
						var weiid="#"+(that.snake[0].x)+"-"+(that.snake[0].y);
						var weiobj=$(weiid);
						weiobj.className="";
						that.snake.shift();
					}
				}
			break;
			case "bottom":
				var headid="#"+(that.snake[that.snake.length-1].x+1)+"-"+(that.snake[that.snake.length-1].y);
				var headobj=$(headid);
				if(headobj==null||that.checkfood(that.snake[that.snake.length-1].x+1,that.snake[that.snake.length-1].y)){
					that.gameover();
					clearInterval(that.t);
					return;
				}else{
					headobj.className="she";
					that.snake.push({x:that.snake[that.snake.length-1].x+1,y:that.snake[that.snake.length-1].y});
					if(that.snake[that.snake.length-1].x==that.food.x&&that.snake[that.snake.length-1].y==that.food.y){
						that.fen+=1;
						$("#fenshu").innerText=that.fen;
						that.getfood();
					}else{
						var weiid="#"+(that.snake[0].x)+"-"+(that.snake[0].y);
						var weiobj=$(weiid);
						weiobj.className="";
						that.snake.shift();
					}
				}	
			break;
			case "left":
				var headid="#"+(that.snake[that.snake.length-1].x)+"-"+(that.snake[that.snake.length-1].y-1);
				var headobj=$(headid);
				if(headobj==null||that.checkfood(that.snake[that.snake.length-1].x,that.snake[that.snake.length-1].y-1)){
					that.gameover();
					clearInterval(that.t);
					return;
				}else{
					headobj.className="she";
					that.snake.push({x:that.snake[that.snake.length-1].x,y:that.snake[that.snake.length-1].y-1});
					if(that.snake[that.snake.length-1].x==that.food.x&&that.snake[that.snake.length-1].y==that.food.y){
						that.fen+=1;
						$("#fenshu").innerText=that.fen;
						that.getfood();
					}else{
						var weiid="#"+(that.snake[0].x)+"-"+(that.snake[0].y);
						var weiobj=$(weiid);
						weiobj.className="";
						that.snake.shift();
					}
				}
			break;
			case "top":
				var headid="#"+(that.snake[that.snake.length-1].x-1)+"-"+(that.snake[that.snake.length-1].y);
				var headobj=$(headid);
				if(headobj==null||that.checkfood(that.snake[that.snake.length-1].x-1,that.snake[that.snake.length-1].y)){
					that.gameover();
					clearInterval(that.t);
					return;
				}else{
					headobj.className="she";
					that.snake.push({x:that.snake[that.snake.length-1].x-1,y:that.snake[that.snake.length-1].y});
					if(that.snake[that.snake.length-1].x==that.food.x&&that.snake[that.snake.length-1].y==that.food.y){
						that.fen+=1;
						$("#fenshu").innerText=that.fen;
						that.getfood();
					}else{
						var weiid="#"+(that.snake[0].x)+"-"+(that.snake[0].y);
						var weiobj=$(weiid);
						weiobj.className="";
						that.snake.shift();
					}
				}
			break;
		}
		return;
	}
		
},
kongzhi:function(){
	var that=this;
	document.onkeydown=function(e){
		var e=e||window.event;
		switch(e.keyCode){
			case 37:
			if(that.fx=="right")
				return;
			that.fx="left";
			break;
			case 38:
			if(that.fx=="bottom")
				return;
			that.fx="top";
			break;
			case 39:
			if(that.fx=="left")
				return;
			that.fx="right";
			break;
			case 40:
			if(that.fx=="top")
				return;
			that.fx="bottom";
			break;
			case 13:
			history.go(0);
			break;
			case 32:
			if(that.flag){
				that.flag=false;
				clearInterval(that.t);
			}else{
				that.flag=true;
				that.t=setInterval(that.move().zou,100);
			}
		}
	}
},
checkfood:function(a,b){
	for (var i = 0; i < this.snake.length; i++) {
		if(this.snake[i].x==a&&this.snake[i].y==b){
			return true;
		}
	};
	return false;
},
gameover:function(){
	$(".defen")[0].style.display="block";
	$(".gameover")[0].style.display="block";
	$("#fenshu").style.opacity=1;
}

}







