// // Set the dimensions and margins of the graph
// var margin = { top: 30, right: 120, bottom: 50, left: 50 },
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom,
//     tooltip = { width: 100, height: 100, x: 10, y: -30 };

// smaller version! 
var margin = {top: 50, right: 30, bottom: 70, left: 100},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
d3.json("/keyword_search").then(function(data) {
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
    
    console.log(x);
    
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

  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function(d) { return d.date; }).left;

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
    
  // Initialize line with first group of the list - add the line
  var line = svg
    .append('g')
    .append("path")
      .datum(data)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(+d["Clean Energy"]) })
      )
      .attr("stroke", function(d){ return myColor("valueB") })
      // .curve(d3.curveMonotoneX) --> area filled in
      .style("stroke-width", 4)
      .style("fill", "none")
      

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

  
var selectedOption = d3.select("#selectButton").property("value")

  // What happens when the mouse move -> show the annotations at the right positions.
  function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1)
  };

  function mousemove() {
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisect(data, x0);
    // console.log(i)
    selectedData = data[i]
    console.log(selectedData)
    console.log(y(selectedData[selectedOption]))
    console.log((selectedData[selectedOption]))
    focus
      .attr("cx", x(selectedData.date))
      // .attr("cy", y(selectedData[selectedOption]))
    focusText
      // .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
      .attr("x", x(selectedData.date)+15)
      // .attr("y", y(selectedData.y))
    };

  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
  };

  // svg.selectAll(".dot")
  //   .data(dataset)
  // .enter().append("circle") // Uses the enter().append() method
  //   .attr("class", "dot") // Assign a class for styling
  //   .attr("cx", function(d, i) { return xScale(i) })
  //   .attr("cy", function(d) { return yScale(d.y) })
  //   .attr("r", 5)
  //     .on("mouseover", function(a, b, c) { 
  // 			console.log(a) 
  //       this.attr('class', 'focus')
	// 	})
  //     .on("mouseout", function() {  })
  
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
        selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})

