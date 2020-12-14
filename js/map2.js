// Code goes here
  var myMarker;
$(document).ready(function() {
  var map = null;
  var myLatlng;

  function initializeGMap(lat, lng) {
    myLatlng = { lat: 40.730610, lng: -73.935242 }

    var myOptions = {
      zoom: 12,
      zoomControl: true,
      center: { lat: 40.730610, lng: -73.935242 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);


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

    document.getElementById('placepin').addEventListener('click', () =>{
      if(myMarker){
        myMarker.setMap(null);
      }
      myMarker = new google.maps.Marker({
        position: map.getCenter(),
        draggable:true,
        title:"Drag me!"
      });
      myMarker.setMap(map);

    });
  }

  // Re-init map before show modal
  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    initializeGMap(button.data('lat'), button.data('lng'));
    $("#location-map").css("width", "100%");
    $("#map_canvas").css("width", "100%");
  });

  // Trigger map resize event after modal shown
  $('#myModal').on('shown.bs.modal', function() {
    google.maps.event.trigger(map, "resize");
    map.setCenter(myLatlng);
    myMarker = null;
    document.getElementById('exampleFormControlFile1').value = null;
    document.getElementById("exampleFormControlTextarea1").value = null;
  });
});
