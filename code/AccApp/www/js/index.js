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
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
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
		// Do stuff with the new orientation data
	},

	handleMotion: function (event) {
		console.log("Interval :"+ event.interval);
		console.log("Rotation Rate: "+event.rotationRate);
		console.log("Acceleration:"+event.acceleration);
		console.log("Acceleration with G:"+event.accelerationIncludingGravity);
		// Do stuff with the new orientation data
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