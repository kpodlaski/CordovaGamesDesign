var app = {
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        /* Start motion api */
		window.addEventListener("deviceorientation", this.handleOrientation.bind(this), true)
		window.addEventListener("devicemotion", this.handleMotion.bind(this), true);
		var ball_img = document.getElementById("ball_img");	
		this.ball = new Ball(30,30,1,1, 300, 300, ball_img);
		this.ball.startAnimation();
    },
	
	handleOrientation: function (event) {
		console.log("Alpha :"+ event.alpha);
		console.log("Beta: "+event.beta);
		console.log("Gamma:"+event.gamma);
		console.log("Absolute:"+event.absolute);
		this.ball.vx = event.alpha/5+1;
		this.ball.vy = -event.gamma/5;
	},

	handleMotion: function (event) {
		console.log("Interval :"+ event.interval);
		console.log("Rotation Rate: "+event.rotationRate);
		console.log("Acceleration:"+event.acceleration);
		console.log("Acceleration with G:"+event.accelerationIncludingGravity);
	},
};

app.initialize();