(function() {
    'use strict';

    var comment = require('../controllers/comment');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Comment, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        // app.get('/api/comment', comment.findAll);

    };
})();
