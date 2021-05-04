// set the dimensions and margins of the graph
var margin = { top: 30, right: 132, bottom: 30, left: 50 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// var parseDate = d3.time.format("%Y").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.2f");
    
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
    var line = svg
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
  
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
    
      focus.append("circle")
        .attr("r", 4.5);
    
      focus.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");
        svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.year) + "," + y(+d.name) + ")");
      }

    // // A function that update the chart
    // function update(selectedGroup) {

    //   // Create new data with the selection?
    //   var dataFilter = data.filter(function(d){return d.name==selectedGroup})

    //   // Give these new data to update line
    //   line
    //       .datum(dataFilter)
    //       .transition()
    //       .duration(1000)
    //       .attr("d", d3.line()
    //         .x(function(d) { return x(d.year) })
    //         .y(function(d) { return y(+d.n) })
    //       )
    //       .attr("stroke", function(d){ return myColor(selectedGroup) })
    // }

    // // When the button is changed, run the updateChart function
    // d3.select("#selectButton").on("change", function(d) {
    //     // recover the option that has been chosen
    //     var selectedOption = d3.select(this).property("value")
    //     // run the updateChart function with this selected option
    //     update(selectedOption)
    // })

})
