/**获取距离蛇头最近的位置**/
function getNearestFood(snake , foods){
	var header = snake.head;
	var min = 150;
	var nearest = null;
	for(var i=0 ; i< foods.length; i++){
		var distance = Math.abs(header.row - foods[i].row) + Math.abs(header.col - foods[i].col);
		if(distance < min){
			min = distance;
			nearest = foods[i];
		}
	}
	
	return nearest;
}
/**
* 根据蛇的位置，食物的位置判断下一步走向
**/
function getNextCmd(snake , foods){
	if(foods.length <= 0){
		return;
	}
	var header = snake.head;
	var nearestFood = getNearestFood(snake , foods);
	if(header.row  - nearestFood.row > 0){
		if(header.dirc !== Dirc.DOWN){
			return Dirc.UP;
		}else if(header.col  - nearestFood.col > 0){
			return Dirc.LEFT;
		}else{
			return Dirc.RIGHT;
		}
	}else if(header.row  - nearestFood.row < 0){
		if(header.dirc !== Dirc.UP){
			return Dirc.DOWN;
		}else if(header.col  - nearestFood.col > 0){
			return Dirc.LEFT;
		}else{
			return Dirc.RIGHT;
		}
	}else if(header.row  - nearestFood.row === 0){
		if(header.col  - nearestFood.col > 0){
			if(header.dirc !== Dirc.RIGHT){
				return Dirc.LEFT;
			}else{
				return Dirc.RIGHT;
			}
		}else{
			if(header.dirc === Dirc.LEFT){
				return Dirc.LEFT;
			}else{
				return Dirc.RIGHT;
			}
		}
	}
	
	return header.dirc;
}