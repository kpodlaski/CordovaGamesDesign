var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        var canva = document.getElementById("drawing_canva");
		canva.addEventListener("touchstart", this.onTouchStart.bind(this), false);
		canva.addEventListener("touchend", this.onTouchEnd.bind(this), false);
		canva.addEventListener("touchcancel", this.onTouchCancel.bind(this), false);
		canva.addEventListener("touchmove", this.onTouchMove.bind(this), false);	
		this.lastTouch = {x:null, y:null};
		this.colors = ['#aaaaaa', '#ffaaff', '#01ffe3'];
		this.color = 0;
    },
	
	onTouchStart: function(event){
		event.preventDefault();
		console.log("TouchStart");
		var touches = event.changedTouches;
		//console.log(JSON.stringify(touches));
		this.color++;
		if (this.color== this.colors.length) this.color=0;
		this.drawBall(touches[0].pageX, touches[0].pageY);
	},
	
	onTouchMove: function(event){
		event.preventDefault();
		console.log("TouchMove");
		var touches = event.changedTouches;
		//console.log(JSON.stringify(touches));
		this.moveBall(touches[0].pageX, touches[0].pageY);
		/*for (t =0; t<touches.length; t++){
			console.log("x "+touches[t].pageX);
		}
		*/
	},
	
	onTouchEnd: function(event){
		event.preventDefault();
		console.log("TouchEnd");
		var touches = event.changedTouches;
		this.drawBall(touches[0].pageX, touches[0].pageY);
	},
	
	onTouchCancel: function(event){
		event.preventDefault();
		console.log("TouchCancel");
	},
	
	drawBall: function(x, y){
		console.log("drawing: ["+x+","+y+"]");
		this.lastTouch.x=x;
		this.lastTouch.y=y;
		var el = document.getElementById("drawing_canva");
		var ctx = el.getContext("2d");
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.colors[this.color];
		ctx.fill();
	},
	
	moveBall: function(x, y){
		console.log("drawing: ["+x+","+y+"]");
		var el = document.getElementById("drawing_canva");
		var ctx = el.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(this.lastTouch.x, this.lastTouch.y);
		ctx.lineTo(x, y);
		ctx.lineWidth = 4;
		ctx.strokeStyle = this.colors[this.color];
		ctx.stroke();
		this.lastTouch.x=x;
		this.lastTouch.y=y;
	}
	
	
};

app.initialize();