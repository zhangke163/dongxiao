$(function(){
	var box=$(".box")[0];

  
	function drag(obj){
    obj.onmousedown=function(e){
       
        var eve=e||window.event;    //解决兼容问题 ,获取鼠标事件的方法
        //阻止浏览器的默认行为
        if(eve.preventDefault){
          eve.preventDefault();   //FF
        }else{
          eve.returnValue=false;   //IE
        }
          var ox=eve.offsetX;    //获得相对盒子的鼠标位置
          var oy=eve.offsetY;


         var cw=document.documentElement.clientWidth;     //获取浏览器的宽高
         var ch=document.documentElement.clientHeight;

         var oox=obj.offsetWidth;     //获取元素的实际宽高
         var ooy=obj.offsetHeight;
         
          var startx,starty,endx,endy,lenx,leny;  //声明6个变量
           startx=ox;    //记录第一个点的位置
           starty=oy;
    	document.onmousemove=function(e){
          var eve=e||window.event;
           //阻止浏览器的默认行为
        

        if(eve.preventDefault){
          eve.preventDefault();
        }else{
          eve.returnValue=false;
        }
          var cx=eve.clientX;   //获得相对浏览器的

          var cy=eve.clientY;
          var x=cx-ox;     //对象相对于浏览器的距离
          var y=cy-oy;
//用来记录对象的运动轨迹
  var div=document.createElement("div");
  div.style.cssText="width:5px;height:5px;background:blue;position:absolute;left:"+x+"px;top:"+y+"px;";
  document.body.appendChild(div);

          endx=x;      //记录最后一个点的位置
          endy=y;
        
          lenx=endx-startx;  //计算点与点之间的距离
          leny=endy-starty;

            startx=endx;  //获取最后两个点之间的距离，然后对lenx和leny进行判断，上一次结束的点作为下一次开始的点
          starty=endy;

      
        if(y>=(ch-ooy)){y=ch-ooy;};      //判断边界
        if(y<0){y=0};
        if(x>=(cw-oox)){x=cw-oox;}
        if(x<0){x=0};


          obj.style.left=x+"px";
          obj.style.top=y+"px";

    	}
    	document.onmouseup=function(e){
          var eve=e||window.event;
           //阻止浏览器的默认行为
        if(eve.preventDefault){
          eve.preventDefault();
        }else{
          eve.returnValue=false;
        }
       
        var xishu=0.8;  //缓冲系数
        function huanchong(){

        lenx*=xishu;  //缓冲距离逐渐变小
        leny*=xishu;
        if(Math.abs(lenx)>=Math.abs(leny)){
            if(Math.abs(lenx)<=1){
              clearInterval(t);
            }
        }
        else{
           if(Math.abs(leny)<=1){
             clearInterval(t);
           }
        }
        var xx=lenx+obj.offsetLeft;    //当前对象的位置
        var yy=leny+obj.offsetTop;
        if(yy>=(ch-ooy)){yy=ch-ooy;};      //判断边界
        if(yy<0){yy=0};
        if(xx>=(cw-oox)){xx=cw-oox;}
        if(xx<0){xx=0};
        obj.style.left=xx+"px";
        obj.style.top=yy+"px";
        }
        var t=setInterval(huanchong,60);
          document.onmousemove=null;  //清除鼠标移动事件
          document.onmousedown=null;    //清除鼠标按下事件
         
    	}
    }
	}
	drag(box);
})
