var express = require('express');
var router = express.Router();

// authorize-controller

router.post('/', function(req, res, next) {
  res.send(`POST: `);
});

router.delete('/:tokenId', function(req, res, next) {
  res.send(`DELETE: ${req.params.tokenId}`);
});

module.exports = router;
