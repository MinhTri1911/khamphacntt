(function() {
    'use strict';

    var category = require('../controllers/category');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Category, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/category', category.findAll);

        app.post('/api/category', category.create);

        app.get('/api/category/:id', category.edit);

        app.put('/api/category/:id', category.update);
        
        app.delete('/api/category/:id', category.delete);

        app.get('/api/parent', category.findParent);

        app.get('/api/parent/notnull', category.findNotNull);

        app.get('/api/parent/:parent_id', category.findNamCate);
    };
})();
