function add(x){
	function adds (y,yy){
		if(y == x){
			return yy;
		}else if (y > x){
            return null;
        }else{
			return adds(y+3,`(${yy}+3)`) || adds(y*3,`(${yy}*3)`);
		}
		
	}
	return adds(1,"1")
}

function findSolution(target){
    function find(current,history){
        if(current == target){
            return history;
        }else if(current > target){
            return null;
        }else{
            return find(current + 5 ,`(${history}+5)`) || find(current *3 ,`(${history}*3)`)
        }
    }
    return find(1,'1')
}