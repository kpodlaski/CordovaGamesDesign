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

    onDeviceReady: function() {
        //Obtain the actual location
		 var location_options = { enableHighAccuracy: true };
		 console.log("Start");
		 navigator.geolocation.getCurrentPosition (this.onPositionSuccess, this.onPositionError, location_options);
		 setTimeout(function(){ 
			console.log("Start watching"); 
			app.watch = navigator.geolocation.watchPosition(app.onPositionSuccess, app.onPositionError, location_options);	
		 }, 1000); //after 1 second
		 setTimeout(function(){ 
			console.log("Stop watching"); 
			navigator.geolocation.clearWatch(app.watch);	
		 }, 60000); //after 60 seconds
    },
	
	onPositionSuccess : function (position) {
		_lat = position.coords.latitude;
		_lon = position.coords.longitude;
		console.log(_lat+" "+_lon);
		$("#lat_in").val(_lat);
		$("#lon_in").val(_lon);
	},
	 
	onPositionError: function(msg){
		console.log(JSON.stringify(msg));
	}
	
};

app.initialize();