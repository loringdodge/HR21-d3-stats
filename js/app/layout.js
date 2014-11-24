define([
    'jQuery', 
    'underscore',
    'text!personTemplate',
    'text!ageTemplate',
    'text!originTemplate',
    'text!workTemplate',
    'text!experienceTemplate',
    'text!futureTemplate',
], function($ , _ , person, age, origin, work, experience, future) {

  var svgTags = Array.prototype.slice.call(arguments, 2);

  return {

    render : function() {

      var visualNames = ["person", "age", "origin", "work", "experience", "future"];

      var template = _.template(
          '<div class="<%= name %> graphic-container">' +
            '<div class="graphic-title color-border-<%= name %>"><%= name %></div>' + 
            '<div class="graphic-description"><span class="color-<%= name %>">32 People</span></br>Hover over each person to see where they fit.</div>' +
          '</div>'
      );

      $.each(visualNames, function(i, name){
          $('#main').append(template({ name : name }));
          $('.' + name).prepend(svgTags[i]);
      });


    }
  }
});