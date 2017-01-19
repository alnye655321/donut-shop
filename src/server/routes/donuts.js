const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Donuts';
  db.any('SELECT * FROM donuts')
  .then((results) => {
    renderObject.donuts = results;
    res.render('donuts.html', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

router.post('/', (req, res, next) => {
  const newDonut = {
    name: req.body.donut_name,
    topping: req.body.topping,
    price: req.body.price
  };
  db.any(`INSERT INTO donuts (name, topping, price) VALUES('${newDonut.name}', '${newDonut.topping}', '${newDonut.price}')`)
  .then((result) => {
    res.send('You added a donut!');
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id', (req, res, next) => {
      const donutID = parseInt(req.params.id);
      const updateDonut = {
        name: req.body.name,
        topping: req.body.topping,
        price: req.body.price
      };

      db.tx(t=> {
          return t.batch([
              t.any(`UPDATE donuts SET name = '${updateDonut.name}' WHERE id = ${donutID}`, [true]),
              t.any(`UPDATE donuts SET topping = '${updateDonut.topping}' WHERE id = ${donutID}`, [true]),
              t.any(`UPDATE donuts SET price = '${updateDonut.price}' WHERE id = ${donutID}`, [true])
          ]);
        })
      .then(result=> {
        if (!result.length) {
          res.status(404).send({
            status: 'error',
            message: 'That donut doesn\'t exist'
          });
        } else {
          res.send('You updated a donut!');
        }
      })
      .catch((error) => {
        next(error);
      });
    });

router.delete('/:id', function (req, res, next) {
  const donutID = parseInt(req.params.id);
  db.tx(t=> {
      return t.batch([
          t.any(`UPDATE employees SET favorite_donut = NULL WHERE favorite_donut = ${donutID}`),
          t.any(`DELETE FROM shops_donuts WHERE donut_id = ${donutID}`)
      ]);
    })
  .then(result=> {
    if (!result.length) {
      res.status(404).send({
        status: 'error',
        message: 'That donut doesn\'t exist'
      });
    } else {
      db.any(`DELETE FROM donuts WHERE id = ${donutID}`)
       .then(function (data) {
        console.log(data);
        res.send('You Deleted a donut!');
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
