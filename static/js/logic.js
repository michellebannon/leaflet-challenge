// // creates the map object which is defined with L.map method.  
var allquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// console.log(all)
  

 // Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("mapid", {
  center: [40, 10],
  zoom: 3
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
 }).addTo(myMap);

d3.json(allquakesURL, data =>{
  var features = data.features;

  features.forEach(obj => {
    var lat = obj.geometry.coordinates[1];
    var lon = obj.geometry.coordinates[0];
    var depth = obj.geometry.coordinates[2];
    var mag = obj.properties.mag;
    var place = obj.properties.place;

    L.circle([lat,lon],{'radius': 30000 * mag, fillColor: getColor(mag), color: 'white', fillOpacity: 1})
      .bindPopup(`${place}<br> Magnitude: ${mag}`)
      .addTo(myMap)
// add color legend
  });
  function getColor(mag) {

    if (mag>4) {
      return 'red'
    } else if (mag > 2 ) {
      return 'orange'
    } else {
      return 'green'
    }
  };
});

