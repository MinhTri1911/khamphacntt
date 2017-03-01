(function() {
    'use strict';

    var search = require('../controllers/search');
    var paginate = require('express-paginate');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Search ,app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.use(paginate.middleware(10, 50));
        app.get('/api/search', search.getSearch);

        // app.post('/api/post', post.create);

        // app.get('/api/post/:id', post.edit);

        // app.put('/api/post/:id', post.update);
        
        // app.delete('/api/post/:id', post.delete);

        // app.get('/api/post/category/:category_id', post.getPostByCategory);

        // app.get('/api/post/series/:news_series_id', post.getPostBySeries);

    };
})();
