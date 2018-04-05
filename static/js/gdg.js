(function($) {
    "use strict";

    $('#collapseCoc').on('hidden.bs.collapse', function () {
        $('#morebtn').html('more...');
    });

    $('#collapseCoc').on('shown.bs.collapse', function () {
        $('#morebtn').html('less...');
    });

})(jQuery);

  	