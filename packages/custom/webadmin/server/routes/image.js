(function() {
    'use strict';

    var image = require('../controllers/image');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Webadmin, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/files/uploads/:imgname', image.getImage);
        app.get('/api/files/uploads/details/:imgname', image.getImages);

    };
})();
