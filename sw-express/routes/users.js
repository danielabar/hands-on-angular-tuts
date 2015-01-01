var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

var hardCodedUserData = [
  {email: 'john.doe@example.com', displayName: 'jdoe'},
  {email: 'robert.smith@test.com', displayName: 'rsmith'},
  {email: 'sarah.black@foo.ca', displayName: 'sblack'}
];

/* GET users listing. */
router.get('/', auth.isAuthenticated, function(req, res) {
  res.json(hardCodedUserData);
});

module.exports = router;
