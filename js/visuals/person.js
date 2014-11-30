define(['d3'], function(d3) {

  // Declare a private function expression that returns a value based on gender
  var isMale = function(d, male, female) {
    if(d.gender === "M") {
      return male;
    } else {
      return female;
    }
  }

  return {
    
    render : function(){

        // Set width and height for the svg
        var width = 500,
            height = 130;

        // Create a color ordinal scale matching a specific color to each gender
        var color = d3.scale.ordinal()
            .domain(['F', 'M'])
            .range(["#FF9200", "#E8AB4C"]);

        // Select the '.person' div (in profile.html), append an svg and set dimensions
        var svg = d3.select('.person')
            .append('svg')
            .attr("width", width)
            .attr("height", height)

        // Append a single tooltip div
        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip-person")
            .attr("text-anchor", "middle")
            .style("visibility", "hidden")
            .text("a simple tooltip");

        // Get the tsv (tab-separated values) data
        d3.tsv("data/profile1.tsv", function(error, data) {

          // Sort the data to group the genders
          // data = data.sort(function (a,b) {return d3.ascending(a.gender, b.gender); });

          // Append a 'g' element for each data item
          var personSVG = svg.selectAll(".individual-person")
              .data(data)
              .enter()
                .append("svg")
                  .attr("class", "individual-person")
                  .attr("x", function(d, i) { 
                    var adjustment = (i % 16);
                    return adjustment * 30;
                  })
                  .attr("y", function(d, i) {
                    var adjustment = Math.floor(i / 16);
                    return adjustment * 55;
                  })
                  .attr("width", 45)
                  .attr("height", 45)
                  .attr("viewBox", function(d){
                    return isMale(d, "0 0 200 200", "0 0 128 128");
                  })
                  .attr("enable-background", function(d){
                    return isMale(d, "new 0 0 200 200", "new 0 0 128 128");
                  })
                  .attr("xml:space", "preserver")
                .append("g")
                  .attr("class", "clickable")
                  .attr("data-id", function(d){ return d.id })
                .on("mouseover", function(d){
                  tooltip.style("visibility", "visible")
                  .html(function(){ 
                    return d.name;
                  });
                })
                .on("mousemove", function(){ 
                  tooltip.style("top",
                    (d3.event.pageY-70)+"px")
                  .style("left",(d3.event.pageX-40)+"px");
                })
                .on("mouseout", function(){
                  tooltip.style("visibility", "hidden")
                })




            // Append an ellipse (head) for each data item
            personSVG.append("ellipse")
                .attr("cx", function(d){
                  return isMale(d, 104.501, 65);
                })
                .attr("cy", function(d){
                  return isMale(d, 17.277, 10);
                })
                .attr("rx", function(d){
                  return isMale(d, 16.828, 10);
                })
                .attr("ry", function(d){
                  return isMale(d, 16.606, 10);
                })
                .attr("fill", "#E8AB4C")
                .attr("class", function(d){ return 'person id' + d.id })
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)
                  .delay(function(d, i) { return i * 50; })

            // Append a path (body) for each data item
            personSVG.append("path")
                .attr("d", function(d){ 
                  return isMale(d, "M136,43.839c0-4.46-3.269-7.37-7.315-7.37H80.114c-4.148,0-7.114,3.223-7.114,7.37v14.63v44.86c0,3.313,2.353,6,5.666,6c2.628,0,4.205-1.085,5.334-3.02v84.02c0,4.971,4.029,9,9,9s9-4.029,9-9v-67.86h5v67.86c0,4.971,4.029,9,9,9s9-4.029,9-9v-84.02c1,1.802,2.874,3.02,5.102,3.02c3.313,0,5.898-2.687,5.898-6V43.839z", "M40.162,64.484c2.375,0.728,4.891-0.606,5.621-2.98c0.002,0,6.727-21.926,6.727-21.926c0.04-0.093,0.241-0.478,0.711-0.478c0.043,0,0.947,0,0.947,0h0.002c0.268-0.004,0.424,0.223,0.353,0.48L41.062,83.638c-0.073,0.257,0,0.706,0.469,0.706h9.307c0.268,0,0.463,0.217,0.463,0.484c0,0-0.002,32.096-0.002,32.108c0,3.205,2.598,5.803,5.803,5.803s5.803-2.598,5.803-5.803l0.002-32.108c0-0.268,0.216-0.484,0.484-0.484h0.008h0.928h0.008c0.268,0,0.484,0.216,0.484,0.484l0.002,32.108c0,3.205,2.598,5.803,5.803,5.803c3.205,0,5.803-2.598,5.803-5.803c0-0.011-0.002-32.108-0.002-32.108c0-0.268,0.196-0.484,0.463-0.484h9.581c0.469,0,0.542-0.449,0.469-0.706L73.476,39.581c-0.071-0.257,0.086-0.484,0.353-0.48h0.002c0,0,0.905,0,0.948,0c0.47,0,0.671,0.385,0.711,0.478c0,0,6.724,21.925,6.727,21.926c0.73,2.374,3.246,3.709,5.621,2.98c2.377-0.729,3.713-3.246,2.984-5.622c-0.003-0.009-3.954-12.895-6.668-21.744c-0.028-0.108-0.053-0.201-0.075-0.277c-1.028-3.573-3.397-11.71-10.987-11.71H54.385c-7.072,0-9.435,8.137-10.464,11.71c-0.022,0.076-6.74,22.012-6.743,22.02C36.45,61.238,37.786,63.756,40.162,64.484z");
                })
                .attr("fill", "#E8AB4C")
                .attr("class", function(d){ return 'person id' + d.id })
                .style('opacity', 0)
                .transition()
                  .style('opacity', 1)
                  .delay(function(d, i) { return i * 50; })

        });
    }
  }
});