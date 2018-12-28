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
		// Do stuff with the new orientation data
	},

	handleMotion: function (event) {
		console.log("Interval :"+ event.interval);
		console.log("Rotation Rate: "+event.rotationRate);
		console.log("Acceleration:"+event.acceleration);
		console.log("Acceleration with G:"+event.accelerationIncludingGravity);
		// Do stuff with the new orientation data
	},
};

app.initialize();