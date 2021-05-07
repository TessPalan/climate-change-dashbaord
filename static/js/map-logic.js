// creating function to choose country color based on income
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
};

// setting path to geojson file 
// var geojsonPath = d3.json('/jeojsaon_map');

// reading in json data and passing into function
d3.json('/geojson_map', function(geojsonData){

    var geoData = geojsonData.features;
    // console.log(geoData);

    // creating base layer when map opens
    var baseLayerInput = L.geoJSON(geojsonData, {
        style: (feature) => ({color: "white",
                            fillColor: "white",
                            fillOpacity: 0.2,
                            weight: 1.5}),
        
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
        <h3>Population: ${feature.properties.pop_est}</h2>
        <h3>CO2 Emissions Per Capita: ${feature.properties.CO2_Emissions} metric tons`)
        }
    });

    var baseLayer = L.layerGroup([baseLayerInput]);

    
    var incomeOutput = L.geoJSON(geojsonData, {
                        style: (feature) => ({color: "white",
                                            fillColor: chooseColorIncome(feature.properties.income_grp),
                                            fillOpacity: 0.5,
                                            weight: 1.5}),
                        
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
                        <h3>Population: ${feature.properties.pop_est}</h2>
                        <h3>CO2 Emissions Per Capita: ${feature.properties.CO2_Emissions} metric tons`)
                        }
    });

    var incomeLayer = L.layerGroup([incomeOutput]);

    // var countries = geojsonData.features;
    var countriesEmission = geoData.map((countryData) => {
        var country = countryData.properties
        
        // Loop through the capitals array
        if (country.cap_lat !== undefined) {
            // console.log(country);
            // For each capital, create a marker and bind a popup with the country's name
            markerCoordinates = [country.cap_lat, country.cap_lon]
            var countryMarker = L.circleMarker(markerCoordinates, {
                                                                'radius': country.CO2_Emissions*1.5,
                                                                // represents size of population relative to CO2 emissions
                                                                'fillColor': "#B21919",
                                                                // represents size of CO2 emissions relative to population 
                                                                'color': "#0000FF",
                                                                'weight': country.pop_est / 80000000,
                                                                'opacity': country.pop_est / 100000000,
                                                                'fillOpacity': country.CO2_Emissions/50
                                                            })
                            .bindPopup(`<h1>${country.name}<h1>
                                        <hr> 
                                        <h3>Carbon Emission: ${country.CO2_Emissions} </h3>
                                        <h3>Population: ${country.pop_est} </h3>`);
            return countryMarker
        }
    })

    var countriesEmission = countriesEmission.filter(d => d !== undefined); 
    // console.log(countriesEmission);

    var capitalLayer = L.layerGroup(countriesEmission);
    

    // overlay maps 
    var overlayMaps = {
        "Emissions by Income" : incomeLayer,
        "Emissions relative to Population" : capitalLayer
    };
    
    var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY 
    });

    var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    }); 

    //base maps
    var baseMaps = {
        "Light Map": lightMap,
        "Dark Map": darkMap
    };

    // setting mymap attributes
    var myMap = L.map("map", {
        center: [20, 0],
        zoom: 3,
        layers: [lightMap, baseLayer]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    
});