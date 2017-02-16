(function() {
    'use strict';

    var uploadCtrl = require('../controllers/upload');
    var multer  = require('multer')
    var slug = require('slug')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './files/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, slug(Date.now()+ '-' +file.originalname))
        }
    });
    var upload = multer({ storage: storage });
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Webadmin, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.post('/api/upload/files', upload.any(), uploadCtrl.postUpload);


    };
})();
