var express = require('express');
var router = express.Router();

// core-controller
router.get('/supportedmodes', function(req, res, next) {
  res.send(`GET supportedmodes`);
});

// payment-session-controller
router.get('/3dsecure', function(req, res, next) {
  res.send(`GET 3dsecure`);
});

router.get('/session', function(req, res, next) {
  res.send(`GET session`);
});

// transaction-controller
router.get('/transaction/:id', function(req, res, next) {
  res.send(`GET transaction ${req.params.id}`);
});

router.post('/capture/:id', function(req, res, next) {
  res.send(`POST capture ${req.params.id}`);
});

router.post('/deposit/:id', function(req, res, next) {
  res.send(`POST deposit ${req.params.id}`);
});

router.post('/directcapture/:id', function(req, res, next) {
  res.send(`POST directcapture ${req.params.id}`);
});

router.post('/refund/:id', function(req, res, next) {
  res.send(`POST refund ${req.params.id}`);
});

module.exports = router;
