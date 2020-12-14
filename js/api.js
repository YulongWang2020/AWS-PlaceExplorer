function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function checksession(){
	// import jwt_decode from 'jwt-decode';
	var latestUser = window.localStorage.getItem("CognitoIdentityServiceProvider.4q1ecjligv40bck1mgeha1noh5.LastAuthUser")
	var idtoken = window.localStorage.getItem("CognitoIdentityServiceProvider.4q1ecjligv40bck1mgeha1noh5." + latestUser + ".idToken")
	console.log(idtoken)
	if (idtoken){
		var expire = parseJwt(idtoken)["exp"]
	}
	else{
		return false
	}
	console.log("session expire: ",expire);
	timestamp = Math.floor(Date.now() / 1000)
	console.log("current time: ",timestamp)
	if(timestamp > expire){
		return false
	}
	else{
		return true
	}
}

function submitform(){
	console.log("Hello world!")
	console.log("Hello world!!!!!!!!!!!!!!!!!!!!!!!!!")
	var comment = document.getElementById("exampleFormControlTextarea1").value;
	var latestUser = window.localStorage.getItem("CognitoIdentityServiceProvider.4q1ecjligv40bck1mgeha1noh5.LastAuthUser")
	if(latestUser){
		console.log("user found")
		
	}
	else{
		alert("Please Login")
	}
	var idtoken = window.localStorage.getItem("CognitoIdentityServiceProvider.4q1ecjligv40bck1mgeha1noh5." + latestUser + ".idToken")
	console.log("CognitoIdentityServiceProvider.4q1ecjligv40bck1mgeha1noh5." + latestUser+ ".idToken")
	console.log(idtoken)
	if (idtoken){
		console.log(myMarker)
		if(!myMarker){
			return alert("Please Pick a Location on the Map.")
		}
		var location = myMarker.getPosition()
		console.log(location)
		// var idtoken = window.localStorage.getItem("token")
		var apigClient = apigClientFactory.newClient();
		var params = {
		};

		var body = {
			"comment": comment,
			"useremail": latestUser,
			"filename": fileName,
			"lat": location.lat(),
			"lng": location.lng()
		};

		var additionalParams = {
		  // If there are any unmodeled query parameters or headers that must be
		  //   sent with the request, add them here.
		  headers: {
		    "Authorization": idtoken,
			}
		};
		console.log(additionalParams)
		return apigClient.userPost(params, body, additionalParams)
	}
	alert("Session Expired Please Login Again!")
	return null
}
function sendmessage(){
	submitform().then((response) => {
		console.log("Hello world!")
		console.log(response);
		document.getElementById('exampleFormControlFile1').value = null;
    	document.getElementById("exampleFormControlTextarea1").value = null;
    	myMarker.setMap(null);
    	myMarker = null;
	}).catch((error) => {
        console.log('an error occurred', error);
      });
	console.log("waht????")
	return true
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

console.log(generateUUID())



function getmarkerapi(){
  console.log("Hello world!")
  console.log("Hello world!!!!!!!!!!!!!!!!!!!!!!!!!")
  var bound = map.getBounds()
  var boundpoints = {
  	"ne": {"lat": bound.getNorthEast().lat(),"lng": bound.getNorthEast().lng()},
    "sw": {"lat": bound.getSouthWest().lat(),"lng": bound.getSouthWest().lng()}
  }
  // var center = [latlng.lat(), latlng.lng()]
  console.log(boundpoints)
  var apigClient = apigClientFactory.newClient();
  // bound: boundpoints ,max: {"asdf": "asdf","sdff":"fdffff"},filter: ""
  return apigClient.userGet({nelat: bound.getNorthEast().lat(), nelng: bound.getNorthEast().lng(),swlat:bound.getSouthWest().lat(),swlng:bound.getSouthWest().lng(),max: "100"}, {}, {});
}


function getmarker(){
  getmarkerapi().then((response) => {
    console.log("Hello world!");
    console.log(response["data"]);
	addmarker(response["data"]);
  }).catch((error) => {
        console.log('an error occurred', error);
      });
}



document.getElementById('showmarker').addEventListener('click', getmarker);


