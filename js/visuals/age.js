define(['d3'], function(d3) {
  return {

    title : "20's & 30's",

    text : "Most people are in their 20's but there are several above 30",

    render : function(){

        // Set margin, width, and height for the svg
        var margin = { top: 10, right: 20, bottom: 40, left: 10 };
            width = 500,
            height = 110;
        
        // Create a linear scale for the x-range with an offset for the margins
        var x = d3.scale.linear()
            .range([0 + margin.left, width - margin.right]);

        // Create a linear scale for the y-range with an offset for the margins
        var y = d3.scale.linear()
            .range([0 + margin.top, height - margin.bottom]);

        // Create an axis on the bottom using the x linear scale
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        // Select the '.age' div (in profile.html), append an svg and set dimensions
        var svg = d3.select('.age')
            .append('svg')
            .attr("width", width)
            .attr("height", height)

        // Get the tsv (tab-separated values) data
        d3.tsv("data/data1.tsv", function(error, data) {

          // Find the min and max age in the data set
          var min = d3.min(data, function(d) { return d.age; });
          var max = d3.max(data, function(d) { return d.age; });

          // Set the domain of the x and y linear scales
          x.domain([min, max]);
          y.domain([0, data.length]);

          // Create a color linear scale matching a value with a color along a range
          var color = d3.scale.linear()
              .domain([min, max])
              .range(["#FF5953", "#FFCEC6"]);

          // Append the x-axis 55px from the bottom
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - 20) + ")")
            .style("fill", "#FFF")
            .call(xAxis);

          // Append a circle for each data item
          svg.selectAll(".age-circle")
            .data(data)
            .enter()
              .append("circle")
                .attr("class", "age-circle")
                .attr("cx", function(d, i) { return x(d.age); })
                .attr("cy", function(d, i) { return y(i); })
                .attr("r", 4)
                .attr("fill", "#FF5953")
                .attr("class", function(d){ return 'age id' + d.id })
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)
                  .delay(function(d, i) { return i * 50; })

        });
    }
  }
});