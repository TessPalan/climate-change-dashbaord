// Creating map object
var basemapId = 'map'
var basemapOptions = {center: [0, 0],
                      zoom: 2}
var myMap = L.map(basemapId, basemapOptions);

// Adding tile layer
var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
var tileLayerOptions = {attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                        maxZoom: 18,
                        id: "light-v10",
                        accessToken: API_KEY}
L.tileLayer(tileLayerUrlTemplate, tileLayerOptions).addTo(myMap);

// Use this link to get the geojson data.
var geojsonPath = "./static/js/data/data2.json";
// var jsonDataPath = "static/data/emission_population_location_copy.json"

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColorIncome(income) {
  color = "blue"
  switch (income) {
    case "4. Lower middle income":
      color = "yellow";
      break;
    case "2. High income: nonOECD":
      color = "purple";
      break;
    case "1. High income: OECD":
      color = "green";
      break;
    case "3. Upper middle income":
      color = "orange";
      break;
    case "5. Low income":
      color = "red";
      break;
    default:
      break;
    }
  return color
}

// Grabbing our GeoJSON data..
d3.json(geojsonPath).then(function(geojsonData) {
    console.log(geojsonData);
    // d3.json(jsonDataPath).then(function(dataResult)) {


    // }
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(geojsonData, {
      // Style each feature (in this case a continent)
      style: (feature) => ({color: "white",
                            fillColor: chooseColorIncome(feature.properties.income_grp), // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                            fillOpacity: 0.5,
                            weight: 1.5}),

  
      // Called on each feature
      onEachFeature: (feature, layer) => {
        layer.on({
                  mouseover: (event) => {layer = event.target;
                                        layer.setStyle({fillOpacity: 0.9})},
                  mouseout: (event) => {layer = event.target;
                                        layer.setStyle({fillOpacity: 0.5})},
                  click: (event) => {myMap.fitBounds(event.target.getBounds())}
                })
              .bindPopup(`<h2>${feature.properties.admin}</h1> 
                          <hr> 
                          <h3>Income Level: ${feature.properties.income_grp}</h2>
                          <h3>Population: ${feature.properties.population}</h2>
                          <h3>CO2 Emissions Per Capita: ${feature.properties.CO2_Emissions} metric tons`);

    }})
    .addTo(myMap);
  

  // Create circle marker layer
  console.log(geojsonData);
  var countries = geojsonData.features;

  // Loop through the capitals array
  var countriesEmission = countries.map((countryData) => {
    var country = countryData.properties
    if (country.cap_lat !== undefined) {

    
      console.log(country);
      // For each capital, create a marker and bind a popup with the country's name
      markerCoordinates = [country.cap_lat, country.cap_lon]
      var countryMarker = L.circleMarker(markerCoordinates, {
                                                          'radius': country.CO2_Emissions*1.5,
                                                          'color': "#ff7800",
                                                          'fillColor': "#402D54",
                                                          'weight': country.population / 80000000,
                                                          'opacity': country.population / 100000000,
                                                          'fillOpacity': country.CO2_Emissions/50
                                                      })
                        .bindPopup(`<h1>${country.name}<h1>
                                    <hr> 
                                    <h3>Carbon Emission: ${country.CO2_Emissions} </h3>
                                    <h3>Population: ${country.population} </h3>`);
      return countryMarker
      }
    })
    countriesEmission = countriesEmission.filter(d => d !== undefined); 
  console.log(countriesEmission);
  var countryLayers = L.layerGroup(countriesEmission)

  // Create a layer control, pass in the overlayMaps.
  var overlayMaps = {"Countries": countryLayers};
  layersOptions = {collapsed: false}
  L.control.layers({},overlayMaps, layersOptions).addTo(myMap);
});
