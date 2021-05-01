// Set the dimensions and margins of the graph
var margin = { top: 30, right: 120, bottom: 50, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    tooltip = { width: 100, height: 100, x: 10, y: -30 };

// smaller version! 
// var margin = {top: 50, right: 30, bottom: 70, left: 100},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Append the svg object to the body of the page
svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("Pytrend Key Words Search Volume (2004 to 2016)");

// var key = 0; --> testing empty dataset

// Read the data
d3.csv("../../../raw data/keyword_search_volume_US.csv").then(function(data) {
    // console.log(data);
    // key = data --> testing as well 
    var allGroup = Object.keys(data[0]).slice(1) // this function gets rid of an element from a list

    // Convert the year to only the year
    var timeConv = data.map(data => {var year = d3.timeParse("%Y")(data.date);
    data["date"] = year;
    return data})
    // console.log(timeConv);
                   
    // Add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // d signifies the element in the data
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7).tickSizeOuter(0));
    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
            (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Years");

    // Add Y axis --> keywords search volume
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d["Clean Energy"]; })])
      .range([ height, 0 ]);
    var yaxis = svg.append("g")
      .call(d3.axisLeft(y));
    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Volume of Keywords Searched");  

    // Initialize line with first group of the list
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(+d["Clean Energy"]) })
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    // A function that update the chart
    function update(selectedOption) {

      // Create new data with the selection?
      // var dataFilter = data.filter(function(d){return d["Clean Energy"]==selectedGroup})
      var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d[selectedOption]; })])
      .range([ height, 0 ]);
      yaxis//.append("g")
      .call(d3.axisLeft(y));
      
      // Give these new data to update line
      line
          .datum(data)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(+d[selectedOption])})
          )
          .attr("stroke", function(d){ return myColor(selectedOption) })
    }
    

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})

