var latitude;
var longitude;
var map;

function initialize() {
    var myLatlng = new google.maps.LatLng(12.933935, 77.614524);
    var mapOptions = {
        zoom: 17,
        center: myLatlng
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
    });
}

function loadMaps() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}

socket.on('locdata-client', function (data) {
    // latlngdata = data;
    // console.log(data);
    var latlngdata = JSON.parse(data);
    latitude = latlngdata.latitude;
    longitude = latlngdata.longitude;
    // console.log("latitude: " + latitude);
    // console.log("longitude: ", + longitude);
    var center = new google.maps.LatLng(latitude, longitude);
    map.panTo(center);
});

window.onload = loadMaps;