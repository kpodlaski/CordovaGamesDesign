class Ball{
	
	constructor (x,y, vx, vy, maxX, maxY, ball_img){
		this.vx=vx;
		this.vy=vy;
		this.x=x;
		this.y=y;
		this.maxX = maxX;
		this.maxY = maxY;
		this.ball_img=ball_img;
	}
	
	startAnimation(){	
		setInterval(this.animation.bind(this), 10);
	}
	
	animation(){			
		this.x+=this.vx;
		this.y+=this.vy;
		this.ball_img.style.left=this.x+"px";
		this.ball_img.style.top=this.y+"px";
		if (this.x<0 || this.x>this.maxX) this.vx*=-1;
		if (this.y<0 || this.y>this.maxY) this.vy*=-1;
	}
}