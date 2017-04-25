window.onload = initMap;//load complete window before executing the code

var map;//declaring global variable map which will hold the google map after we create it

// Create constructor for each user n
function commentInput(uname, message){
	this.uname= uname;
	this.message=message;	
}

function initMap(){//call function init to call function handleButtonClick and contains 
	var button = document.getElementById("sendComment");//assign vutton variable to the button with id sendComment
	button.onclick = handleButtonClick;//when button is clicked, call function handleButtonClick
	/*button.onclick = viewComments;*/

/*	if(navigator.geolocation){//through the geolocation api, if the navigator.geolocation exists, then run
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);//call getCurrentPositition method and pass displayLocation function
	} else {
		alert("Oops, no geolocation support");
	}*/

	/*var uluru = {lat: position.coords.latitude, lng: position.coords.longitude};
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);*/
	var uluru = {lat: -20.3484, lng: 57.5522};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: uluru
	});

	var infoWindow = new google.maps.InfoWindow({map: map});


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			var marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: "You are here!",
				clickable: true
			});

			var infoWindow = new google.maps.InfoWindow({
				content:"You are here: " + pos.lat +", " + pos.lng,
				position:pos
			});
	
			google.maps.event.addListener(marker, "click", function(){
				infoWindow.open(map);
			})

			/*var title = "Your location";
			var content = "You are here:" + coords.latitude + ", " + coords.longitude;
			addMarker(map, pos, title, content);*/

			map.setCenter(pos);
		}
		, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
}

function handleButtonClick(){/*Create function called handleButtonClick(). the action for when the button is clicked will be saved in this function*/
	var myUser = document.getElementById("commentname").value;//assign the value that is inside the element ID called commentname into variable userName
	var myMsg = document.getElementById("usercomment").value;//assign the value that is inside the element ID called usercomment into variable userComment
	var commentx = new commentInput(myUser,myMsg);//create new object with constructor
	
	var ul = document.createElement("ul");//create ul element to put in userName and userComment
	ul.setAttribute("id", commentx.uname);//set the ul id to the name of the person commenting
	
	document.getElementById("commentList").appendChild(ul);//add the ul element we created into the div with ID commentList
	
	var li = document.createElement("li");	//create li element to put in userName and userComment
	li.innerHTML = commentx.uname + ": " + commentx.message;
	
	var ul = document.getElementById(commentx.uname);//call for ul with the user commenting
	ul.appendChild(li);//put in the 
}


//location code
/*function displayLocation(position){//our handler which will be called when browser has location thanks to getMyLocation function
	var latitude = position.coords.latitude;//grab longitude and latitude values from position.coords object
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");//assign the div with id = location to variable div from contact-form.html
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;//display location on the div on the webpage
}

function displayError(error){//new handler for getCurrentPosition, which is passed when an error is made by geolocation api
	var errorTypes = {
		0: "Unknown Error",
		1: "Permission Denied by User",
		2: "Position is not available",
		3: "Request Timed out"
	};//error object contains a code property that has a number from 0 to 3. we create an object with three properties named zero to three. These properties are strings with an error message we want to associate with each number

	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2){//if error code is 0 or 2
		errorMessage = errorMessage + " " + error.message;//print the corresponding error message. for 0 and 2, there is sometimes additional information in the error message property
	}
	var div = document.getElementById("location");//grab the div element with ID map
	div.innerHTML = errorMessage; //put in  the errorMessage assigned into the div with ID map
}*/