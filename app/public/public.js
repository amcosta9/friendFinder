/**
 * Created by Ariel on 4/25/2017.
 */

// materialize triggers for select option and modal functionality
$('select').material_select();
$('.modal').modal();


$("#search-btn").on("click", function (event) {
    event.preventDefault();

    // create new object for user answers
    var newSurvey = {
        name: $("#user-name").val().trim(),
        photo: $("#user-photo").val().trim(),
        scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()]
    };


    var totalDifference = 0,
        currentMatch;
    alert("Searching for Matches");
//        $(".form-group").reset();
    function calcResults(newSurvey) {
        var currentURL = window.location.origin;
        $.ajax({url: currentURL + "/api/friends", method: "GET"})
            .done(function (friendsData) {
                // Here we are logging the URL so we have access to it for troubleshooting
                console.log("URL: " + currentURL + "/api/friends");
                // Here we then log the friends to console, where it will show up as an object.
                console.log(friendsData);
                console.log('newSurvey', newSurvey.scores);
                currentMatch = friendsData[0];
                var currentMatchDiff = 99;
                // Loop through and calculate differences for each of the friends
                for (var i = 0; i < friendsData.length; i++) {
                    totalDifference = 0;
                    console.log('friendsData', friendsData[i].scores);
                    console.log('newsurv scores length', newSurvey.scores.length);
                    // loop through each score of friendsData[i]
                    for (var j = 0; j < newSurvey.scores.length; j++) {
                        // calculate absolute value of difference between current friend's score and newSurvey scores
                        var thisDiff = Math.abs(friendsData[i].scores[j] - newSurvey.scores[j]);
                        // add each difference to totalDifference
                        totalDifference += thisDiff;
                    } // /newSurvey.scores.length for loop
                    // if total difference between current friend and new survey is less, current friend is more compatible, reassigned as currentMatch
                    if (totalDifference < currentMatchDiff) {
                        currentMatchDiff = totalDifference;
                        currentMatch = friendsData[i];
                    }
                    console.log(friendsData[i].name);
                    console.log('totalDifference', totalDifference);
                    console.log('currentMatch', currentMatch);
                    console.log('currentMatchDiff', currentMatchDiff);
                } // /friendsData.length for loop
                console.log('--------------------------');
                console.log('Your Match is: ' + currentMatch.name);
                // trigger modal to display currentMatch details
                triggerModal(currentMatch);
            }); // //ajax.done()
    } // /calcResults()

    calcResults(newSurvey);


    // append to modal
    function triggerModal(currentMatch) {
        console.log('trig modal function');

        $(".modal-body").append('<p>Your match is ' + currentMatch.name + '!</p>');
        $(".modal-body").append('<img src="' + currentMatch.photo + '">');

        $('#resultsModal').modal('open');
    }

    $.post("/api/survey", newSurvey);
}); // /.on('click')