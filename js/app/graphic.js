require([
    'jQuery', 
    'underscore',
    'layout',
    'personJS',
    'ageJS',
    'originJS',
    'workJS',
    'experienceJS',
    'futureJS',
], function($ , _ , layout, personJS, ageJS, originJS, workJS, experienceJS, futureJS) {

    var visualObjects = Array.prototype.slice.call(arguments, 3);

    $(document).ready(function(){

        layout.render();

        $.each(visualObjects, function(index, visual){
            visual.graphic();
        });

    });

});