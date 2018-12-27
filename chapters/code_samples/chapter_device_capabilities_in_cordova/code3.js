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
		 //Start watch for location changes
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