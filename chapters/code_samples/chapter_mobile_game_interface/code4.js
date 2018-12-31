/* Author: Krzysztof Podlaski, University of Lodz */
/* based on basic Apache Cordova app			  */
var app = {
	
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
		this.vjoy_canvas = document.getElementById("vjoy_canvas");
		var scale = 10;
		this.VJoy = new CatapultDVJoy(this.vjoy_canvas, scale);
		
		var ball_img = document.getElementById("ball1_img");	
		var ball1 = new Ball(30,30,0.1,0.1, 300, 300, ball_img);
		ball_img.logic_ball=ball1;
		ball_img.addEventListener("touchstart",this.VJoy.touchStart.bind(this.VJoy), false);
		
		ball_img = document.getElementById("ball2_img");	
		var ball2 = new Ball(180,30,1,-1, 300, 300, ball_img);
		ball_img.logic_ball=ball2;
		ball1.startAnimation();
		
		ball_img.addEventListener("touchstart",this.VJoy.touchStart.bind(this.VJoy), false);
		ball2.startAnimation();
		
		document.addEventListener("touchmove", this.VJoy.update.bind(this.VJoy), false);	
		document.addEventListener("touchend", this.VJoy.touchEnd.bind(this.VJoy), false);	
    },	
	
	
};

app.initialize();