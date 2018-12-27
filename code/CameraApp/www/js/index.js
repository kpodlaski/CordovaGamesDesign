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
        $("#take_photo_btn").click( function(){
			camera_options = {
					destinationType: Camera.DestinationType.FILE_URI,
					quality: 75,
					sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
					saveToPhotoAlbum: true,
					popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
				};
			navigator.camera.getPicture(app.onSuccess, app.onFail, camera_options);
		});
    },
	
	onSuccess: function(imageData) {
		var image = $("#taken_photo")[0];//document.getElementById("taken_photo");
		image.src = "data:image/jpeg;base64," + imageData;
		//console.log(image.src);
		qrcode.callback = function(decodedData) {
			console.log(JSON.stringify(decodedData));
		}
		var _qr1 = qrcode.decode(image.src);
		console.log(JSON.stringify(_qr1));
		
	},
	
	onFail: function (msg) {
		console.log("ERRORR");
		console.log(JSON.stringify(msg));
	},
	
};

app.initialize();