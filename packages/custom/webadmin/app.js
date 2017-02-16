'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var path = require('path');
var Webadmin = new Module('webadmin');
var express = require('express');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Webadmin.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  Webadmin.routes(app, auth, database, circles);
  app.use('/static', express.static(path.join(__dirname, '/../../../files/uploads')));
  //We are adding a link to the main menu for all authenticated users
  Webadmin.menus.add({
    title: 'webadmin example page',
    link: 'webadmin example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  Webadmin.menus.add({
    title: 'category',
    link: 'category',
    roles: ['authenticated'],
    menu: 'main'
  });
  Webadmin.menus.add({
    title: 'series',
    link: 'series',
    roles: ['authenticated'],
    menu: 'main'
  });
  Webadmin.menus.add({
    title: 'post',
    link: 'post',
    roles: ['authenticated'],
    menu: 'main'
  });
  Webadmin.menus.add({
    title: 'upload',
    link: 'upload',
    roles: ['authenticated'],
    menu: 'main'
  });
  Webadmin.menus.add({
    title: 'uploads',
    link: 'uploads',
    roles: ['authenticated'],
    menu: 'main'
  });
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Webadmin.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Webadmin.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Webadmin.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Webadmin;
});
