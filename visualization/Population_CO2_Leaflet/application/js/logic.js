// Read in csv
var CO2Data = d3.csv("../visualization/raw data/CO2_emissions_per_capita.csv")
var populationData = d3.csv("../visualization/raw data/population_total_by_country.csv")
var geoJson = d3.json("../visualization/raw data/GeoJSON.json")

var geodata;
// This function reads both data above at the same time
Promise.all([CO2Data, populationData, geoJson]).then(data => {console.log(data) // geodata = data => {console.log(data
  
  // Create our initial map object
  // Set the longitude, latitude, and the starting zoom level
  var myMap = L.map("mapid", {
    center: [34.05, -118.24],
    zoom: 13,
    doubleClickZoom: true
  }); 
  
  // Add a tile Layer (the background map image) to our map
  var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap); // addTo method to add ojects to our map

    // Loop through the stations array
    var countryMarkers = stations.map((station) => {
     // For each station, create a marker and bind a popup with the station's name
      markerCoordinates = [station.lat, station.lon]
      var bikeMarker = L.marker(markerCoordinates)
    //                     .bindPopup(`<h3>${station.name}<h3>
    //                                 <hr>
    //                                 <h2>Capacity: ${station.capacity}</h2>`);
    //   return bikeMarker
    // })
  
    // var bikeStations = L.layerGroup(bikeMarkers)
  
    // var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
    // var tileLayerOptions = {attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //                         maxZoom: 18,
    //                         id: "light-v10",
    //                         accessToken: API_KEY}
    // var lightmap = L.tileLayer(tileLayerUrlTemplate, tileLayerOptions);
  
    
    // // Create the map object with options
    // var mapElement = 'map-id'
    // var mapOptions = {center: [40.73, -74.0059],
    //                   zoom: 12,
    //                   layers: [lightmap, bikeStations]}
    // var map = L.map(mapElement, mapOptions);
      
    // // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // var baseMaps = {"Light Map": lightmap};
    // var overlayMaps = {"Bike Stations": bikeStations};
    // layersOptions = {collapsed: false}
    // L.control.layers(baseMaps, overlayMaps, layersOptions).addTo(map);

})