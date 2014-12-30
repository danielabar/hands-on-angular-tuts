var express = require('express');
var router = express.Router();

var hardCodedCategoryData = [
  {name: 'All'},
  {name: 'Background'},
  {name: 'Combat'},
  {name: 'Leadership'}
];

/* GET categories listing. */
router.get('/', function(req, res) {
  res.json(hardCodedCategoryData);
});

module.exports = router;
