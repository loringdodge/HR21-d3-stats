define(['d3'], function(d3) {
  return {
    render : function(){

        // Set width and height for the svg
        var width = 500,
            height = 270;
        
        // Create a linear scale for the x-range
        var x = d3.scale.linear()
            .range([0, width]);

        // Select the '.future' div (in profile.html), append an svg and set dimensions
        var svg = d3.select('.future')
            .append('svg')
            .attr("width", width)
            .attr("height", height)

        // Get the tsv (tab-separated values) data
        d3.tsv("data/profile1.tsv", function(error, data) {

          // Filter the data into categories representing the number of people in each category
          var data = d3.nest()
            .key(function(d) { return d.work;})
            .rollup(function(d) { return d })
            .entries(data);

          // Sort the data from most to least in each category
          data = data.sort(function (a,b) {return d3.descending(a.values.length, b.values.length); });

          // Find the min and max in the data set
          var min = d3.min(data, function(d) { return d.values.length; });
          var max = d3.max(data, function(d) { return d.values.length });

          // Create a color linear scale matching a value with a color along a range
          var color = d3.scale.linear()
            .domain([min, max])
            .range(["#FCFCF7", "#FFF872"]);

          // Set the domain of the x linear scale
          x.domain([0, max]);

          // Append a 'g' element for each data item
          var node = svg.selectAll('.future-rect')
            .data(data)
            .enter().append('g')
            .attr('class', "future-rect")
            .attr("transform", function(d,i) { return "translate(0," + i * 22 + ")"; });

          // Append a rectangle to each 'g'
          node.append('rect')
            .attr('width', function(d) { console.log(d); return x(d.values.length); })
            .attr('height', 20)
            .attr('fill', "#FFF872")
            .attr('class', function(d) {
              var set = d.values;
              var results = "future ";
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
            .attr("dy", ".8em")
            .attr("dx", ".3em")
            .attr("dominant-baseline", "central")
            .style("stroke", "#333")
            .style("font-size", "13px")
            .style("font-weight", 100)
            .text(function(d) { return d.key + " (" + d.values.length + ")"});

        });
    }
  }
});