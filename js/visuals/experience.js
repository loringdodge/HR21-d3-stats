define(['d3'], function(d3) {
  return {
    render : function(){

      // Set margin, width, and height for the svg
      var margin = { top: 10, right: 10, bottom: 10, left: 30 };
      var width = 500,
          height = 110;
      
      // Create a linear scale for the x-range with an offset for the margins
      var x = d3.scale.linear()
          .range([0 + margin.left, width - margin.right]);

      // Create a linear scale for the y-range with an offset for the margins
      var y = d3.scale.linear()
          .range([height - margin.top, 0 + margin.bottom]);

      // Create an axis on the bottom using the y linear scale
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      // Create a line with the x and y linear scales
      var line = d3.svg.line()
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d.experience); });

      // Select the '.experience' div (in profile.html), append an svg and set dimensions
      var svg = d3.select('.experience')
          .append('svg')
          .attr("width", width)
          .attr("height", height)

      // Get the tsv (tab-separated values) data
      d3.tsv("data/profile1.tsv", function(error, data) {

        // Sort the data from most experience to least
        data = data.sort(function (a,b) {return d3.descending(a.experience, b.experience); });

        // Find the min and max experience in the data set
        var min = d3.min(data, function(d) { return d.experience });
        var max = d3.max(data, function(d) { return d.experience });

        // Set the domain of the x and y linear scales
        x.domain([0, data.length]);
        y.domain([min, max]);

        // Create a color linear scale matching a value with a color along a range
        var color = d3.scale.linear()
          .domain([min, max])
          .range(["#9DE8B0", "#98FF73"]);

        // Append the y-axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(20, 0)")
            .style("fill", "none")
            .style("font-size", "14px")
            .style("font-weight", 100)
            .style("stroke", "#FFF")
            .style("stroke-width", ".1em")
            .call(yAxis)

        // Append a circle for each data item
        svg.selectAll(".experience-circle")
          .data(data)
          .enter()
            .append('circle')
            .attr("class", "experience-circle")
            .attr('cx', function(d, i) { return i * ((width - 40) / 32) + 30} )
            .attr('cy', function(d, i) { return y(d.experience)} )
            .attr('r', 4)
            .attr("fill", "#98FF73")
            .attr("class", function(d){ return 'experience id' + d.id })
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)
              .delay(function(d, i) { return i * 50; })

        // Append a path/line based on the data
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("stroke", "#9DE8B0")
            .style("stroke-width", "1.5px")

      });

    }
  }
});