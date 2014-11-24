require([
    'jQuery', 
    'underscore',
    'd3',
    'layout1',
    'personJS',
    'ageJS',
    'originJS',
    'workJS',
    'experienceJS',
    'futureJS',
], function($ , _ , d3, layout1, personJS, ageJS, originJS, workJS, experienceJS, futureJS) {

    var visualObjects = Array.prototype.slice.call(arguments, 2);
    var visualNames = ["person", "age", "origin", "work", "experience", "future"];

    $(document).ready(function(){

        layout1.render();

        // person.graphic();

        // $.each(visualNames, function(index, name){
        //     $('#main').append(template({ name : name }));
        // });

    });

});