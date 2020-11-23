var express = require('express');
var router = express.Router();

// tokens-controller

router.post('/', function(req, res, next) {
  res.send(`POST: `);
});

router.get('/:id', function(req, res, next) {
  res.send(`GET: ${req.params.id}`);
});

router.patch('/:id', function(req, res, next) {
  res.send(`PATCH: ${req.params.id}`);
});

module.exports = router;
