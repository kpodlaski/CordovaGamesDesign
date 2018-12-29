var app = {
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
		this.vjoy_canvas = document.getElementById("vjoy_canvas");
		var scale = 10;
		var ball_img = document.getElementById("ball_img");	
		var ball = new Ball(30,30,1,1, 300, 300, ball_img);
		this.VJoy = new DynamicVJoy(this.vjoy_canvas, ball, scale);
		document.addEventListener("touchstart",this.VJoy.touchStart.bind(this.VJoy), false);
		document.addEventListener("touchmove", this.VJoy.update.bind(this.VJoy), false);	
		document.addEventListener("touchend", this.VJoy.touchEnd.bind(this.VJoy), false);	
		ball.startAnimation();
    },	
	
	
};

app.initialize();