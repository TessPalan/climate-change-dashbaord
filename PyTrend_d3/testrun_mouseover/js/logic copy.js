// set the dimensions and margins of the graph
var margin = { top: 30, right: 132, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y").parse,
//     bisectDate = d3.bisector(function(d) { return d.date; }).left,
//     formatValue = d3.format(",.2f");
    
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv").then(function(data) {

    // List of groups (here I have one group per column)
    var allGroup = d3.map(data, function(d){return(d.name)}).keys()

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.n; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // Initialize line with first group of the list
    line = svg
    .append('g')
    .append("path")
      .datum(data.filter(function(d){return d.name==allGroup[0]}))
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(+d.n) })
      )
      .attr("stroke", function(d){ return myColor("valueA") })
      .style("stroke-width", 4)
      .style("fill", "none")
      
    // This allows to find the closest X index of the mouse:
    bisect = d3.bisector(function(d) { return d.x; }).left;
    
    // Create the circle that travels along the curve of chart
    var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

    // Create the text that travels along the curve of chart
    var focusText = svg
    .append('g')
    .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")
  
    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      focus.style("opacity", 1)
      focusText.style("opacity",1)
    }

    function mousemove() {
      // recover coordinate we need
      var x0 = x.invert(d3.mouse(this)[0]);
      var i = bisectDate(data, x0, 1);
      selectedData = data[i]
      focus
        .attr("cx", x(selectedData.x))
        .attr("cy", y(selectedData.y))
      focusText
        .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
        .attr("x", x(selectedData.x)+15)
        .attr("y", y(selectedData.y))
      }
    function mouseout() {
      focus.style("opacity", 0)
      focusText.style("opacity", 0)
    }

  
    function update(selectedGroup) {
      // Create new data with the selection?
      var dataFilter = data.filter(function(d){return d.name==selectedGroup})

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(+d.n) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})
