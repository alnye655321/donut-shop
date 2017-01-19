const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Employees';
  db.any('SELECT * FROM employees')
  .then((results) => {
    renderObject.employees = results;
    res.render('employees.html', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

router.post('/', (req, res, next) => {
  const newEmployee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  db.any(`INSERT INTO employees (first_name, last_name, email) VALUES('${newEmployee.first_name}', '${newEmployee.last_name}', '${newEmployee.email}')`)
  .then((result) => {
    res.send('You added an employee!');
  })
  .catch((error) => {
    next(error);
  });
});

router.put('/:id', (req, res, next) => {
      const employeeID = parseInt(req.params.id);
      const updateEmployee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.last_name
      };

      db.tx(t=> {
          return t.batch([
              t.any(`UPDATE employees SET first_name = '${updateEmployee.first_name}' WHERE id = ${employeeID}`, [true]),
              t.any(`UPDATE employees SET last_name = '${updateEmployee.last_name}' WHERE id = ${employeeID}`, [true]),
              t.any(`UPDATE employees SET email = '${updateEmployee.email}' WHERE id = ${employeeID}`, [true])
          ]);
        })
      .then(result=> {
        if (!result.length) {
          res.status(404).send({
            status: 'error',
            message: 'That employee doesn\'t exist'
          });
        } else {
          res.send('You updated an employee!');
        }
      })
      .catch((error) => {
        next(error);
      });
    });

router.delete('/:id', function (req, res, next) {
  const employeeID = parseInt(req.params.id);

  db.any(`DELETE FROM employees WHERE id = ${employeeID}`, [true])
   .then(function (data) {
    console.log(data);
    res.send(data);
  })
   .catch(function (error) {
    next(error);
  });
});

module.exports = router;
