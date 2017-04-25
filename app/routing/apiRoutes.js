/**
 * Created by Ariel on 4/22/2017.
 */
var friendsArr = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return res.json(friendsArr);


    });

// Create new friend - takes in JSON input
    app.post("/api/survey", function(req, res) {
        var newSurvey = req.body;

        console.log(newSurvey);
            friendsArr.push(newSurvey);

    });
};