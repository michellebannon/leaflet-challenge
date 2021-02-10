// // creates the map object which is defined with L.map method.  
var allquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// console.log(all)

// Creating our initial map object
// We set the longitude, latitude,and the starting zoom level
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

d3.json(allquakesURL, data => {
  var features = data.features;

  features.forEach(obj => {
    var lat = obj.geometry.coordinates[1];
    var lon = obj.geometry.coordinates[0];
    var depth = obj.geometry.coordinates[2];
    var mag = obj.properties.mag;
    var place = obj.properties.place;

    // Addes circle objects to the map for depth
    L.circle([lat, lon], {
        'radius': 30000 * mag,
        fillColor: getColor(depth),
        color: getColor(depth),
        fillOpacity: 1
      })
      .bindPopup(`${place}<br> Magnitude: ${mag}`)
      .addTo(myMap)
  });
  //  funciton for getting the color on the map based on the depth.  Worked with my tutor on this
  function getColor(depth) {
    switch (true) {
      case depth>89:
        return '#ea2c2c';
      case depth>69:
        return '#ea822c';
      case depth>49:
        return '#ee9c00';
      case depth>29:
        return '#eecc00';
      case depth>9:
        return '#d4ee00';
      case depth<10:
        return '#98ee00';
    }
  };
  // Set up the legend
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
// legend based on degrees of change; worked with my tutor on this
    var grades = [-10,10,30,50,70,90];
    var colors = ['#98ee00', '#d4ee00', '#eecc00', '#ee9c00','#ea822c','#ea2c2c'];
// created a for loop for the grades of color to be applied
    for (let i = 0; i < grades.length; i++) {
      //created div to pull in the colors as a gradient 
      div.innerHTML += "<i style='background: " + colors[i] + "';>" + grades[i] + (grades[i+1] ? "&ndash;" + "<br>" : "+") + "</i>";
    };


    return div;
  }
legend.addTo(myMap)
});