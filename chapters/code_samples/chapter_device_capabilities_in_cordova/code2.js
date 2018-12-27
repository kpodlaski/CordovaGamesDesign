var app = {
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        /* Start motion api */
		window.addEventListener("deviceorientation", this.handleOrientation, true)
		window.addEventListener("devicemotion", this.handleMotion, true);
		this.vx=1;
		this.vy=1;
		this.x=30;
		this.y=30;
		setInterval(this.animation, 10);
    },
	
	handleOrientation: function (event) {
		console.log("Alpha :"+ event.alpha);
		console.log("Beta: "+event.beta);
		console.log("Gamma:"+event.gamma);
		console.log("Absolute:"+event.absolute);
		app.vx = event.alpha/5+1;
		app.vy = -event.gamma/5;
	},

	handleMotion: function (event) {
		console.log("Interval :"+ event.interval);
		console.log("Rotation Rate: "+event.rotationRate);
		console.log("Acceleration:"+event.acceleration);
		console.log("Acceleration with G:"+event.accelerationIncludingGravity);
	},
	
	animation : function(){
		ball = document.getElementById("ball_img");		
		app.x+=app.vx;
		app.y+=app.vy;
		ball.style.left=app.x+"px";
		ball.style.top=app.y+"px";
		if (app.x<0 || app.x>300) app.vx*=-1;
		if (app.y<0 || app.y>300) app.vy*=-1;
	}
};

app.initialize();