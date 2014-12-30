var express = require('express');
var router = express.Router();

var hardCodedRankData = [
  {name: 'All'},
  {name: 'Novice'},
  {name: 'Seasoned'}
];

/* GET ranks listing. */
router.get('/', function(req, res) {
  res.json(hardCodedRankData);
});

module.exports = router;
