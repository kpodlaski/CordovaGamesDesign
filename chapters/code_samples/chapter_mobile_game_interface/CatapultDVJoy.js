/* Author: Krzysztof Podlaski, University of Lodz */
class CatapultDVJoy extends DynamicVJoy{
	constructor(canvas, scale){
		super(canvas,null,scale);
	}
	
	touchStart(event){
		console.log("Touch Start");
		var touch = event.changedTouches[0];
		this.ball = touch.target.logic_ball;
		this.canvas.style.left = (touch.clientX-this.canvas.width/2)+"px";
		this.canvas.style.top = (touch.clientY-this.canvas.height/2)+"px";
		this.canvas.style.display="block";
		this.positionOffset = {x:parseInt(this.canvas.style.left), y:parseInt(this.canvas.style.top)};
		console.log(touch);
		console.log(this);		
		this.update(event);
	}
	
	update(event){
		console.log(this);		
		console.log("Ball P: "+this.ball.x +" "+this.ball.y);
		console.log("Ball V: "+this.ball.vx +" "+this.ball.vy);
		var touch = event.changedTouches[0];
		this.actualPosition.x=touch.clientX - this.positionOffset.x - this.canvas.width/2;
		this.actualPosition.y=touch.clientY - this.positionOffset.y - this.canvas.height/2;
		this.drawVJoy();
	}
	
	touchEnd(event){
		console.log("TouchStop");
		this.canvas.style.display="none";
		this.ball.vx = -this.actualPosition.x/this.scale;
		this.ball.vy = -this.actualPosition.y/this.scale;	
	}
}