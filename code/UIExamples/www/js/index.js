/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		this.colors = ['#aaaaaa', '#ffaaff', '#01ffe3'];
		this.color = 0;
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        var canva = document.getElementById("drawing_canva");
		canva.addEventListener("touchstart", this.onTouchStart.bind(this), false);
		canva.addEventListener("touchend", this.onTouchEnd.bind(this), false);
		canva.addEventListener("touchcancel", this.onTouchCancel.bind(this), false);
		canva.addEventListener("touchmove", this.onTouchMove.bind(this), false);	
		this.lastTouch = {x:null, y:null};
    },
	
	onTouchStart: function(event){
		event.preventDefault();
		console.log("TouchStart");
		var touches = event.changedTouches;
		console.log(JSON.stringify(touches));
		this.color++;
		if (this.color== this.colors.length) this.color=0;
		this.drawBall(touches[0].pageX, touches[0].pageY);
	},
	
	onTouchMove: function(event){
		event.preventDefault();
		console.log("TouchMove");
		var touches = event.changedTouches;
		console.log(JSON.stringify(touches));
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
	},
		
};

app.initialize();