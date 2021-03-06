var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

var hardCodedEdgeData = [
  {
    name: 'Attractive',
    category: {
      name: 'Background'
    },
    description: 'It’s no secret that beautiful people have an easier time getting their way in life. This Edge grants your beautiful or handsome character +2 to Charisma',
    requirements: [
      { type: 'rank', name: '', value: 'Novice' },
      { type: 'trait', name: 'Vigor', value: 'd6' }
    ]
  },
  {
    name: 'Very Attractive',
    category: {
      name: 'Background'
    },
    description: 'Your hero is drop-dead gorgeous. His Charisma is increased to +4',
    requirements: [
      { type: 'rank', name: '', value: 'Novice' },
      { type: 'edge', name: '', value: 'Attractive' }
    ]
  },
  {
    name: 'Brave',
    category: {
      name: 'Background'
    },
    description: 'Those with this Edge have learned to master their fear. Or perhaps are so jaded or emotionally distant they’ve just lost their normal “fight or flight” responses. Either way, your hero adds +2 to Fear tests. If the character is in a setting that uses Guts as a Setting Rule, it adds to that as well.',
    requirements: [
      { type: 'rank', name: '', value: 'Novice' },
      { type: 'trait', name: 'Spirit', value: 'd6' }
    ]
  },
  {
    name: 'Block',
    category: {
      name: 'Combat'
    },
    description: 'Warriors who engage in frequent hand-to-hand combat are far more skilled in personal defense than most others. They’ve learned not only how to attack, but how to block their opponent’s blows as well. A fighter with this Edge adds +1 to his Parry.',
    requirements: [
      { type: 'rank', name: '', value: 'Seasoned' },
      { type: 'skill', name: 'Fighting', value: 'd8' }
    ]
  },
  {
    name: 'Brawler',
    category: {
      name: 'Combat'
    },
    description: 'Frequent fights with his bare hands have given this thug a powerful punch. When he hits a foe with a successful bare-handed Fighting roll, he adds +2 to his damage.',
    requirements: [
      { type: 'rank', name: '', value: 'Novice' },
      { type: 'trait', name: 'Strength', value: 'd6' }
    ]
  },
  {
    name: 'Command',
    category: {
      name: 'Leadership'
    },
    description: 'Command is the ability to give clear instructions to surrounding allies and enforce your hero’s will upon them. This makes your character’s compatriots more willing to fight on despite their wounds, and so adds +1 to their Spirit rolls to recover from being Shaken.',
    requirements: [
      { type: 'rank', name: '', value: 'Novice' },
      { type: 'trait', name: 'Smarts', value: 'd6' }
    ]
  },
  {
    name: 'Hold the Line!',
    category: {
      name: 'Leadership'
    },
    description: 'This Edge strengthens the will of the men under the hero’s command. The troops add +1 to their Toughness.',
    requirements: [
      { type: 'rank', name: '', value: 'Seasoned' },
      { type: 'trait', name: 'Smarts', value: 'd8' },
      { type: 'edge', name: '', value: 'Command' }
    ]
  }
];

router
  .route('/')
    .get(function(req, res) {
      res.json(hardCodedEdgeData);
    })

    // A real app would sanitize/validate, then persist in db
    // This simple implementation just pushes to in-memory list
    .post(auth.isAuthenticated, function(req, res) {
      var edge = req.body;
      if (!edge.name) {
        res.status(400).send({message: 'Edge must have a name'});
        return;
      }

      // convert rank to a requirement
      var rankRequirement = {};
      if (edge.rank && edge.rank.name) {
        rankRequirement.type = 'rank';
        rankRequirement.name = '';
        rankRequirement.value = edge.rank.name;
      }
      edge.requirements = [rankRequirement];
      delete edge.rank;

      hardCodedEdgeData.push(edge);
      res.status(201).send(edge);
    });

// A real app would look this up in db
router
  .route('/:id')
    .get(function(req, res) {
      var edgeName = req.params.id;
      var edge = null;
      for (var i=0; i<hardCodedEdgeData.length; i++) {
        if (hardCodedEdgeData[i].name === edgeName) {
          edge = hardCodedEdgeData[i];
        }
      }
      if (edge) {
        res.json(edge);
      } else {
        res.status(404).end();
      }
    })
    .delete(function(req, res) {
      var edgeName = req.params.id;
      var foundEdge = false;
      for (var i=0; i<hardCodedEdgeData.length; i++) {
        if (hardCodedEdgeData[i].name === edgeName) {
          hardCodedEdgeData.splice(i, 1);
          foundEdge = true;
        }
      }
      if (foundEdge) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    });


module.exports = router;
