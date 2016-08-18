var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Boston Transit Ninja' });
});

router.get('/features', function(req, res, next) {
  res.render('features', { title: 'Boston Transit Ninja features' });
});

module.exports = router;
