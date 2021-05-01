// EndpointURL = 'http://techslides.com/demos/country-capitals.json'


d3.json('./static/js/data/emission_population_location_copy.json', function(response){
    var countries = response.countries;

    // //Create panes for each of the sets of markers
    // var pane1 = map.createPane('markers1');
    // var pane2 = map.createPane('markers2');
    
    // Loop through the capitals array
    var countriesEmission = countries.map((country) => {
    // For each station, create a marker and bind a popup with the station's name
    markerCoordinates = [country.CapitalLatitude, country.CapitalLongitude]
    var countryMarker = L.circleMarker(markerCoordinates, {
                                                        'radius': country.CarbonEmission*1.5,
                                                        'color': "#ff7800",
                                                        'fillColor': "#402D54",
                                                        'weight': country.Population / 80000000,
                                                        'opacity': country.Population / 100000000,
                                                        'fillOpacity': country.CarbonEmission/50
                                                    })
                      .bindPopup(`<h1>${country.CountryName}<h1>
                                  <hr> 
                                  <h3>Carbon Emission: ${country.CarbonEmission} </h3>
                                  <h3>Population: ${country.Population} </h3>`);
    return countryMarker
    })

    var map = L.map('map').setView([20, 0], 2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);


    var countryLayers = L.layerGroup(countriesEmission)

    // Create a layer control, pass in the overlayMaps.
    var overlayMaps = {"Countries": countryLayers};
    layersOptions = {collapsed: false}
    L.control.layers(overlayMaps, layersOptions).addTo(map);
})