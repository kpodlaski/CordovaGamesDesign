var app = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

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
	},
	
	onFail: function (msg) {
		console.log("ERRORR");
		console.log(JSON.stringify(msg));
	},
	
};

app.initialize();