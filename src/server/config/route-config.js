(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const donutRoutes = require('../routes/donuts');
    const emplyeeRoutes = require('../routes/employees');

    // *** register routes *** //
    app.use('/', routes); //for shops
    app.use('/donuts', donutRoutes);
    app.use('/employees', emplyeeRoutes);

  };

})(module.exports);
