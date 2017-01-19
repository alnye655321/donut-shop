const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Donut Shop Manager';
  db.any('SELECT * FROM shops')
  .then((results) => {
    renderObject.shops = results;
    res.render('index.html', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/show/:id', (req, res, next) => {
  const showID = parseInt(req.params.id);
  const renderObject = {};
  renderObject.title = 'Show Shop';
  db.tx(function (t) {
          return t.batch([
              t.any('SELECT * FROM donuts JOIN shops_donuts on donuts.ID = shops_donuts.shop_id WHERE shop_id = $1', showID),
              t.any('SELECT * FROM employees WHERE shop_id = $1', showID),
              t.one('SELECT * FROM shops WHERE id = $1', showID)
          ]);
        })
      .then(function (data) {
        renderObject.donuts = data[0];
        renderObject.employees = data[1];
        renderObject.shops = data[2];
        //res.send(renderObject);
        console.log(renderObject.shops);
        res.render('show.html', renderObject);
      })
      .catch(function (error) {
          console.log('ERROR:', error.message || error);
        });
});

router.post('/', (req, res, next) => {
  const newEmployee = {
    name: req.body.name,
    city: req.body.city
  };
  db.any(`INSERT INTO shops (name, city) VALUES('${newEmployee.name}', '${newEmployee.city}')`)
  .then((result) => {
    res.send('You added a shop!');
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id', (req, res, next) => {
      const shopID = parseInt(req.params.id);
      const updateShop = {
        name: req.body.name,
        city: req.body.city
      };

      db.tx(t=> {
          return t.batch([
              t.any(`UPDATE shops SET name = '${updateShop.name}' WHERE id = ${shopID}`, [true]),
              t.any(`UPDATE shops SET city = '${updateShop.city}' WHERE id = ${shopID}`, [true])
          ]);
        })
      .then(result=> {
        if (!result.length) {
          res.status(404).send({
            status: 'error',
            message: 'That shop doesn\'t exist'
          });
        } else {
          res.send('You updated a shop!');
        }
      })
      .catch((error) => {
        next(error);
      });
    });

router.delete('/:id', function (req, res, next) {
  const shopID = parseInt(req.params.id);
  db.tx(t=> {
      return t.batch([
          t.any(`DELETE FROM employees WHERE shop_id = ${shopID}`),
          t.any(`DELETE FROM shops_donuts WHERE shop_id = ${shopID}`)
      ]);
    })
  .then(result=> {
    if (!result.length) {
      res.status(404).send({
        status: 'error',
        message: 'That shop doesn\'t exist'
      });
    } else {
      db.any(`DELETE FROM shops WHERE id = ${shopID}`)
       .then(function (data) {
        console.log(data);
        res.send('You Deleted a shop!');
      })
       .catch(function (error) {
        next(error);
      });
    }
  })
  .catch((error) => {
    next(error);
  });

});

module.exports = router;
