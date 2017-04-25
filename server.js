/**
 * Created by Ariel on 4/22/2017.
 */
var express = require("express");
var bodyParser = require("body-parser");

// Sets up express Server
var app = express();
var PORT = process.env.PORT || 4321;

// Sets up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



// requiring api and html routes, setting function to express app route
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// starting server w/ listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
