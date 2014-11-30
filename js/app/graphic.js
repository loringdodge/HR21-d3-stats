require([
    'jQuery', 
    'underscore',
    'd3',
    'layout',
    'personJS',
    'ageJS',
    'originJS',
    'workJS',
    'experienceJS',
    'futureJS',
], function($ , _ , d3, layout, personJS, ageJS, originJS, workJS, experienceJS, futureJS) {

    var graphics = Array.prototype.slice.call(arguments, 4);

    $(document).ready(function(){

        layout.render();

        $.each(graphics, function(index, value){
            value.render();
        });

        var storage = {};
        var previous = '';

        $('#main').on('click', '.clickable', function(){
            var id = $(this).data('id');

            $('.id' + previous).each(function(){
              var key = $(this).attr('class');
              $(this).attr('fill', storage[key]);
            })

            $('.id' + id).each(function(){
              var key = $(this).attr('class');
              if(!storage[key]){
                var color = $(this).attr('fill');
                storage[key] = color;
              }
              $(this).attr('fill', '#FFF');
            })

            previous = id;

        });

    });



});