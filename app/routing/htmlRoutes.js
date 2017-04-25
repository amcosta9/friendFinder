/**
 * Created by Ariel on 4/22/2017.
 */
var path = require("path");
var express = require("express");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // to get the images working.....!!!!
    // var htmlPath = path.join(__dirname, 'html');
    // app.use(express.static(htmlPath));
};