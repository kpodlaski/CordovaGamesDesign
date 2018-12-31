/* Author: Krzysztof Podlaski, University of Lodz */
class DynamicVJoy extends VJoy{
	constructor(canvas, ball, scale){
		super(canvas,ball,scale);
	}
	
	touchStart(event){
		var touch = event.changedTouches[0];
		this.canvas.style.left = (touch.clientX-this.canvas.width/2)+"px";
		this.canvas.style.top = (touch.clientY-this.canvas.height/2)+"px";
		this.canvas.style.display="block";
		this.positionOffset = {x:parseInt(this.canvas.style.left), y:parseInt(this.canvas.style.top)};
		super.update(event);
	}
	
	touchEnd(event){
		this.canvas.style.display="none";
	}
}