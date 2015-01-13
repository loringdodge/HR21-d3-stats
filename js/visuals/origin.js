define(['d3'], function(d3) {
  return {

    title : "Around the world",

    text : "Four of our fellow students came a long way to be here",

    render : function(){

        // Set margin, width, and height for the svg
        var margin = { top: 10, right: 20, bottom: 40, left: 10 };
            width = 500,
            height = 100;

        // Create a linear scale for the x-range with an offset for the margins
        var x = d3.scale.linear()
            .range([0 + margin.left, width - margin.right]);

        // Create a linear scale for the y-range with an offset for the margins
        var y = d3.scale.linear()
            .range([0 + margin.top, height - margin.bottom]);

        // Create a color ordinal scale matching a specific color to a specific value
        var color = d3.scale.ordinal()
            .domain(['Y', 'N'])
            .range(["#A358E8", "#B874D0"]);

        // Select the '.origin' div (in profile.html), append an svg to represent international students
        var internationalSVG = d3.select('.origin')
            .append('svg')
            .attr("width", 200)
            .attr("height", 100)
            .attr("class", "internationalSVG");

        // Select the '.origin' div (in profile.html), append an svg to represent students from the U.S.
        var usSVG = d3.select('.origin')
            .append('svg')
            .attr("width", 200)
            .attr("height", 100)
            .attr("class", "bubble");

        // Createa bubble layout for international
        var bubbleInternational = d3.layout.pack()
            .size([55, 100])
            .padding(1.5)
            .value(function(d) {return d.size;})

        // Createa bubble layout for U.S.
        var bubbleUS = d3.layout.pack()
            .size([200, 100])
            .padding(1.5)
            .value(function(d) {return d.size;})

        // Custom function to filter the data to distinguish U.S. and international students
        var processData = function(data) {
          var dataUS = [];
          var dataInternational = [];

          for(var i = 0; i < data.length; i++){
            data[i]["size"] = 3;
            if(data[i].international === "Y"){
              dataInternational.push(data[i]);
            } else {
              dataUS.push(data[i]);
            }
          }

          return [{children: dataUS}, {children: dataInternational}];
        }

        // Get the tsv (tab-separated values) data
        d3.tsv("data/data1.tsv", function(error, data) {

            // Translate each data item into a node with x, y, and r properties
            var nodesUS = bubbleUS.nodes(processData(data)[0])
                  .filter(function(d) { return !d.children; })

            // Translate each data item into a node with x, y, and r properties
            var nodesInternational = bubbleInternational.nodes(processData(data)[1])
                  .filter(function(d) { return !d.children; })

            // Append a circle for each data item in international
            internationalSVG.selectAll('.international-circle')
                .data(nodesInternational)
              .enter().append('circle')
                .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
                .attr('r', function(d) { return d.r; })
                .attr('class', "international-circle")
                .style("fill", function(d) { return color(d.international) })
                .attr("class", function(d){ return 'id' + d.id })
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)
                  .delay(function(d, i) { return i * 50; })

            // Append a text overlay for international
            internationalSVG.append("text")
              .attr("dy", "3.8em")
              .attr("dx", "0em")
              .attr("dominant-baseline", "central")
              .style("stroke", "white")
              .style("font-size", "13px")
              .style("font-weight", 100)
              .text("International");

            // Append a circle for each data item in U.S.
            usSVG.selectAll('.international-circle')
                .data(nodesUS)
              .enter().append('circle')
                .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
                .attr('r', function(d) { return d.r; })
                .attr('class', "international-circle")
                .attr("fill", function(d) { return color(d.international) })
                .attr("class", function(d){ return 'origin id' + d.id })
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)
                  .delay(function(d, i) { return i * 50; })

            // Append a text overlay for U.S.
            usSVG.append("text")
              .attr("dy", "3.8em")
              .attr("dx", "5em")
              .attr("dominant-baseline", "central")
              .style("stroke", "white")
              .style("font-size", "13px")
              .style("font-weight", 100)
              .text("United States");

        });
    }
  }  
});