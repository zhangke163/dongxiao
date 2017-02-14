 
// 第一种方法 基于函数
// function darg(sele){
//    sele.onmousedown=function(e){
//    	var eve=e||window.event;	
//    	if(eve.preventDefault){       // 阻止浏览器的默认行为
//    		eve.preventDefault();
//    	}else{
//    		eve.returnValue=false;
//    	}

//    	var ox=eve.offsetX;             // 鼠标相对于盒子的距离
//    	var oy=eve.offsetY;
//      var startx,starty,endx,endy,lengx,lengy;
//      startx=ox; 
//      starty=oy;  
//     document.onmousemove=function(e){  //鼠标移动
// 		   	var eve=e||window.event;
// 		   	// 阻止浏览器的默认行为
// 	   	    if(eve.preventDefault){       
// 		           eve.preventDefault();
// 		   	}else{
// 		   		eve.returnValue=false;
// 		   	} 
//             // 让盒子卡边 不让盒子跑出页面
//             // var x2=sele.offsetWidth;    //盒子实际宽高
//             // var y2=sele.offsetHeight;
// 		    var cx=eve.clientX;     //鼠标相对浏览器的位置  
// 		    var cy=eve.clientY;
// 		    var x=cx-ox;           //盒子相对于浏览器的距离
// 		    var y=cy-oy;
// 		   var x1=document.documentElement.clientWidth-sele.offsetWidth;
// 		  var y1=document.documentElement.clientHeight-sele.offsetHeight;    
// 		    if(x<=0){x=0};
// 		    if(y<=0){y=0};
// 		    if(x>x1){x=x1};
// 		    if(y>y1){y=y1};
// 		    sele.style.left=x+"px";
// 		    sele.style.top=y+"px";
//             // 设置加div让有蓝点痕迹
// 		    var  box2=document.createElement("div");
// 		    document.body.appendChild(box2);
//             box2.style.cssText="width:5px;height:5px;background:blue;position:absolute;left:"+x+"px;top:"+y+"px;";
//             // 设置点间距离 主要是要用len 就是俩点之间距离
// 		    endx=x;
// 		    endy=y;
// 		    lengx=endx-startx;
// 		    lengy=endy-starty;
//             startx=endx;
//             starty=endy;
//    	  }
//     document.onmouseup=function(){  //鼠标抬起
//    	 	  var xishu=0.9;
//    	 	var t=setInterval(function(){   //让时间函数运行使盒子有缓冲感
//    	 		lengx*=xishu;
//    	 		lengy*=xishu;
//              if(Math.abs(lengx)>=Math.abs(lengy)){
//              	if(Math.abs(lengx)<=1){
//                     clearInterval(t);                         
//              	}
//              	}else{
//              		if(Math.abs(lengy)<=1){
//                     clearInterval(t);
//              	            }
//              	} 
//           // 判断边界
//           var xx=lengx+sele.offsetLeft;
//           var yy=lengy+sele.offsetTop;
//           var x1=document.documentElement.clientWidth-sele.offsetWidth;
// 		  var y1=document.documentElement.clientHeight-sele.offsetHeight;
// 		    if(xx<=0){xx=0};
// 		    if(yy<=0){yy=0};
// 		    if(xx>x1){xx=x1};
// 		    if(yy>y1){yy=y1};
//    	 		sele.style.left=xx+"px";  
//    	 		sele.style.top=yy+"px";
//    	 	 },60); 
//      document.onmousemove=null;
//      document.onmouseup=null;
//      } 
//    }
// }



// 第二种方法
// 构造函数：共有属性

function drag2(obj,father,animate,attrobj){
    this.father=father||document;
    this.attrobj=attrobj||{};
    this.box2=obj;
    this.animate=animate==undefined?true:animate; //三元运算符  控制动画有无 
    this.x=this.attrobj.x==undefined?true:this.attrobj.x  //控制x轴是否移动
    this.y=this.attrobj.y==undefined?true:this.attrobj.y  //控制y轴是否移动:
    this.ox=0;    //this指向实例化对象 obj
    this.oy=0;
    this.cx=0;
    this.cy=0;
    if(this.father.nodeType==9){          //判断父类
     //   this.cw=document.documentElement.clientWidth;
     //   this.ch=document.documentElement.clientHeight;
      this.xx=document.documentElement.clientWidth-this.box2.offsetWidth;
      this.yy=document.documentElement.clientHeight-this.box2.offsetHeight;
      
    }else{
   //    this.cw=this.father.offsetWidth; 
    //   this.ch=this.father.offsetHeight;
        this.xx=this.father.offsetWidth-this.box2.offsetWidth;
        this.yy=this.father.offsetHeight-this.box2.offsetHeight;
    }
  //  this.cw=document.documentElement.clientWidth; //浏览器实际宽高
  //  this.ch=document.documentElement.clientHeight;
    this.ow=this.box2.offsetWidth;  //盒子实际宽高
    this.oh=this.box2.offsetHeight;
    this.startx=0;
    this.starty=0;
    this.endx=0;
    this.endy=0;
    this.lenx=0;
    this.leny=0;
    this.xishu=0.8;
 }
// 原型：共有方法
drag2.prototype={

  drags:function(){
       this.down();
    
  },
  down:function(){
    var that=this;  //事件外部 this指向实例化对象 就是obj
    this.box2.onmousedown=function(e){ 
    //在事件内部this指事件源 就是那个div
      var eve=e||window.event;
      that.move();
      that.up();
  //    that.ox=eve.offsetX;  //鼠标相对于盒子距离
 //     that.oy=eve.offsetY;
      that.ox=eve.clientX-that.box2.offsetLeft;
      that.oy=eve.clientY-that.box2.offsetTop;

      that.startx=that.ox;
      that.starty=that.oy;
    }
  },
  move:function(){
      var that=this;
    document.onmousemove=function(e){  //this不是指div了 是指document
       var eve=e||window.event;
       if(eve.preventDefault){eve.preventDefault();}  //阻止浏览器默认行为
       else(eve.returnValue=false)
      that.cx=eve.clientX;  //鼠标相对于浏览器距离 
      that.cy=eve.clientY;
      var x=that.cx-that.ox;
      var y=that.cy-that.oy;
      // 移动边界
      if(x<=0){x=0};
      if(x>=that.xx){x=that.xx};
      if(y<=0){y=0};
      if(y>=that.yy){y=that.yy};
      if(that.x){that.box2.style.left=x+"px";}
      if(that.y){that.box2.style.top=y+"px";}
    
      that.endx=x;
      that.endy=y;
      that.lenx=that.endx-that.startx;
      that.leny=that.endy-that.starty;
      that.startx=that.endx;
      that.starty=that.endy;
    }
  },
  up:function(){
    var that=this;
    document.onmouseup=function(){
      that.xishu=0.9;
      if(that.animate){
      var t2=setInterval(function(){  //缓冲效果
        that.lenx*=that.xishu;
        that.leny*=that.xishu;
        if(Math.abs(that.lenx)>=Math.abs(that.leny)){
          if(Math.abs(that.lenx)<=1){
            clearInterval(t2)
          }
        }else if(Math.abs(that.leny)<=1){
            clearInterval(t2)
          }
          // 判断边界
       var x1=that.lenx+obj.offsetLeft;
       var y1=that.leny+obj.offsetTop;
 //      var xx=document.documentElement.clientWidth-box2.offsetWidth;
  //     var yy=document.documentElement.clientHeight-box2.offsetHeight;
        if(that.x1<=0){that.x1=0};
        if(that.y1<=0){yy=0};
        if(that.x1>that.xx){that.x1=that.xx};
        if(that.y1>that.yy){that.y1=that.yy};
       that.box2.style.left=that.x1+"px";
       that.box2.style.top=that.y1+"px";     
         },60);
      }
      document.onmousemove=null;
      document.onmouseup=null;
    }
  },
}
