
var friends = require('../data/friends.js');

module.exports = function(app){

  app.get('/api/friends', function(req, res){
    res.json(friends);
  });

  app.post('/api/friends', function(req, res){

    // object to hold the best match info
    var bestMatch = {
      name: "",
      photo: "",
      matchDifference: 1000
    };

    var newFriend = req.body;
    var userScores = newFriend.scores;

    var totalDifference = 0;

    // loop through all the friends
    for (var i = 0; i < friends.length; i++) {
      totalDifference = 0;

      // loop through the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // calculate the difference between the scores and add them to the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.matchDifference) {

          // set newFriend to current bestMatch
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.matchDifference = totalDifference;
        }
      }
    }

    friends.push(newFriend);
    res.json(bestMatch);

  });

};
