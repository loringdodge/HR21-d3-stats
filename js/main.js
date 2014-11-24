require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jQuery': '../bower_components/jquery/dist/jquery.min',
        'underscore': '../bower_components/underscore/underscore-min',
        'd3': '../bower_components/d3/d3.min',
        'text': '../bower_components/requirejs-text/text',
        'layout': 'app/layout',
        'graphic': 'app/graphic',
        'personTemplate': 'templates/person.html',
        'ageTemplate': 'templates/age.html',
        'originTemplate': 'templates/origin.html',
        'workTemplate': 'templates/work.html',
        'experienceTemplate': 'templates/experience.html',
        'futureTemplate': 'templates/future.html',
        'personJS': 'visuals/person',
        'ageJS': 'visuals/age',
        'originJS': 'visuals/origin',
        'workJS': 'visuals/work',
        'experienceJS': 'visuals/experience',
        'futureJS': 'visuals/future',
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['graphic']);