/* Author: Krzysztof Podlaski, University of Lodz */
/* based on basic Apache Cordova app			  */
var app = {
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
		var canvas = document.getElementById("vjoy_canvas");
		var scale = 10;
		var ball_img = document.getElementById("ball_img");	
		var ball = new Ball(30,30,1,1, 300, 300, ball_img);
		this.VJoy = new VJoy(canvas, ball, scale);
		canvas.addEventListener("touchstart", this.VJoy.update.bind(this.VJoy), false);
		canvas.addEventListener("touchmove", this.VJoy.update.bind(this.VJoy), false);
		ball.startAnimation();
    },	
};

app.initialize();