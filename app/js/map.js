// координаты маркеров
var markersData = [
  {
    lat: 50.377257,     // Широта
    lng: 30.379448,    // Долгота
    name: "г.Киев, Крюковщина, ул. Жулянская 1А", // Произвольное название, которое будем выводить в информационном окне
    url: 'img/pin.png'
  }
]
// координаты центров городов
var centerMaps = [
  {
    latX: 50.377257,
    latY: 30.379448
  }
]
var map, latLng, url, name, mark, marker, thisCenter, popupContent;
function initMap() {
  popupContent = '<p class="content">ЖК Европейське місто</p>'
  thisCenterX = centerMaps[0].latX;
  thisCenterY = centerMaps[0].latY;
  var centerLatLng = new google.maps.LatLng(thisCenterX, thisCenterY);
  var mapOptions = {
    center: centerLatLng,
    zoom: 15,
    scrollwheel: false,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    styles:
        [

          {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
              {
                "saturation": "-100"
              },
              {
                "color": "#9ea8b8"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              },
              {
                "color": "#9ea8b8"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 65
              },
              {
                "visibility": "on"
              },
              {
                "color": "#fafbfc"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": "50"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": "-100"
              },
              {
                "color": "#d5dae3"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "30"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
              {
                "lightness": "40"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": -25
              },
              {
                "saturation": -97
              },
              {
                "color": "#d5dae2"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              {
                "lightness": -25
              },
              {
                "saturation": -100
              }
            ]
          }

        ]
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);


  // Определяем границы видимой области карты в соответствии с положением маркеров
  var bounds = new google.maps.LatLngBounds();

  for (let i = 0; i < markersData.length; i++){

    latLng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    name = markersData[i].name;
    url = markersData[i].url;
    number = markersData[i].number;
    addMarker(latLng, name, url, number);
  }
  infowindow = new google.maps.InfoWindow({
    content: popupContent
  });

  // Автоматически масштабируем карту так, чтобы все маркеры были в видимой области карты
  // map.fitBounds(bounds);
  var myoverlay = new google.maps.OverlayView();
  myoverlay.draw = function () {
    this.getPanes().markerLayer.id='markerLayer';
  };
  myoverlay.setMap(map);
  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}
google.maps.event.addDomListener(window, "load", initMap);
function addMarker(latLng, name, url) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: name,
    icon: {
      url: url,
      scaledSize: new google.maps.Size(40, 40)
    }
  });
}
