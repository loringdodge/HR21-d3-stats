define(['d3'], function(d3) {
  return {
    render : function(){

        // Set width and height for the svg
        var width = 500,
            height = 130;
        
        // Create a linear scale for the x-range
        var x = d3.scale.linear()
            .range([0, width]);

        // Create a linear scale for the y-range
        var y = d3.scale.linear()
            .range([0, height]);

        // Select the '.work' div (in profile.html), append an svg and set dimensions
        var svg = d3.select('.work')
            .append('svg')
            .attr("width", width)
            .attr("height", height)

        // Get the tsv (tab-separated values) data
        d3.tsv("data/profile1.tsv", function(error, data) {

          // Filter the data into categories representing the number of people in each industry
          var data = d3.nest()
            .key(function(d) { return d.work;})
            .rollup(function(d) { return d })
            .entries(data);

          // Sort the data from most to least in each industry
          data = data.sort(function (a,b) {return d3.descending(a.values.length, b.values.length); });

          // Find the min and max number of people in each industry in the data set
          var min = d3.min(data, function(d) { return d.values.length; });
          var max = d3.max(data, function(d) { return d.values.length });

          x.domain([0, data.length]);
          y.domain([min, max]);

          // Create a color linear scale matching a value with a color along a range
          var color = d3.scale.linear()
            .domain([min, max])
            .range(["#59B4FF", "#C5E1FF"]);

          // Append a 'g' element for each data item
          var node = svg.selectAll(".work-rect")
            .data(data)
            .enter().append('g')
            .attr("class", "work-rect")
            .attr("transform", function(d,i) { return "translate(" + x(d.values.length) + ", 0)"; });

          // Append a rectangle to each 'g'
          node.append("rect")
            .attr("width", function(d, i) { return y(d.values.length) })
            .attr("height", 100)
            .attr("fill", "#59B4FF")
            .style("stroke", "#333")
            .style("stroke-width", "2px")
            .attr('class', function(d) {
              var set = d.values;
              var results = "work ";
              for(var i = 0; i < d.values.length; i ++){
                results += "id" + d.values[i]['id'] + " ";
              }
              return results;
            })
            .style('opacity', 0)
            .transition()
              .style('opacity', 1)
              .delay(function(d, i) { return i * 50; })

          // Append a text element inside each rectangle
          node.append("text")
            .attr("dy", ".4em")
            .attr("dx", ".8em")
            .attr("dominant-baseline", "central")
            .style("stroke", "#333")
            .style("font-size", "13px")
            .style("font-weight", 100)
            .style("writing-mode", "tb")
            .style("glyph-orientation-vertical", 90)
            .text(function(d) { return d.key + " (" + d.values.length + ")"});

        });
    }
  }
});