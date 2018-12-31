/* Author: Krzysztof Podlaski, University of Lodz */
class VJoy {
	
	constructor(canvas, ball, scale){
		this.canvas = canvas;
		this.ball=ball;
		this.scale=scale;
		this.actualPosition = {x:0, y:0};
		this.positionOffset = {x:parseInt(this.canvas.style.left), y:parseInt(this.canvas.style.top)};
		this.drawVJoy();
	}
	
	update(event){
		var touch = event.changedTouches[0];
		this.actualPosition.x=touch.clientX - this.positionOffset.x - this.canvas.width/2;
		this.actualPosition.y=touch.clientY - this.positionOffset.y - this.canvas.height/2;
		this.ball.vx = this.actualPosition.x/this.scale;
		this.ball.vy = this.actualPosition.y/this.scale;
		this.drawVJoy();
	}
	
	drawVJoy(){
		var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		//Draw small circle in the middle
		ctx.beginPath();
		ctx.arc(this.canvas.width/2, this.canvas.height/2, 1, 0, 2 * Math.PI, false);
		ctx.fillStyle = '#000000';
		ctx.fill();
		//Draw big circle 
		ctx.beginPath();
		ctx.arc(this.canvas.width/2, this.canvas.height/2, this.canvas.width/2-2, 0, 2 * Math.PI, false);
		ctx.strokeStyle = '#aaaaaa';
		ctx.lineWidth = 2;
		ctx.stroke();
		if (this.actualPosition.x && this.actualPosition.y){
			//Draw position pointer 
			var _x = this.actualPosition.x + this.canvas.width/2;
			var _y = this.actualPosition.y + this.canvas.height/2;
			ctx.beginPath();
			ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
			ctx.lineTo(_x, _y);
			ctx.strokeStyle = '#0505ff';
			ctx.stroke();
		} 		
	}
}