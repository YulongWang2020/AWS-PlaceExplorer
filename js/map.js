var map, infoWindow;

var markerlist = [];
var winlist = [];
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.730610, lng: -73.935242 },
    zoom: 8,
	});
  map.setZoom(15)
  // infoWindow = new google.maps.InfoWindow();
  // const locationButton = document.createElement("button");
  // locationButton.setAttribute('class', "btn btn-light")
  // locationButton.setAttribute('style', "margin-top: 10px")
  // locationButton.textContent = "Pan to Current Location";
  // locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
  //   // Try HTML5 geolocation.
	infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.setAttribute('class', "btn btn-light")
    locationButton.setAttribute('style', "margin-top: 10px")
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            // infoWindow.setPosition(pos);
            // infoWindow.setContent("Location found.");
            // infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function attachinfowindow(marker,url){
  var infowindow = new google.maps.InfoWindow({
    content: "<img src="+url+ " style=\"width:100%;height:100%;\">"
  })

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
  return infowindow
}

function addmarker(response){
  console.log("adding marker")
  console.log(response)
  for(var i = 0; i < markerlist.length; i++){
    markerlist[i].setMap(null)
  }
  markerlist.length = 0

  for(var i = 0; i < winlist.length; i++){
    winlist[i].close()
  }
  winlist.length = 0



  for(var i = 0; i < response.length; i++){
    console.log("adding marker")
    myMarker = new google.maps.Marker({
      position: {lat: response[i]["lat"] , lng: response[i]["lng"]},
      title:"a marker"
    });
    // console.log(map)
    // console.log(myMarker)
    myMarker.setMap(map);
    var url = "https://placeexplorer.s3.amazonaws.com/" + response[i]["objectKey"]
    console.log(url)
    infowindow = attachinfowindow(myMarker,url)

    markerlist.push(myMarker)
    winlist.push(infowindow)
    
  }
}