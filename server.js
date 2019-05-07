const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require("./models");

const PORT = process.env.PORT || 8080;

// setting up the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// connecting to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/serverlogger");

// api routes
app.get("/logs", (req, res) => {
    console.log("Parsing database...")
    db.Log
        .find(req.query)
        .sort({ date: -1 })
        .then((data) => {
            console.log("Data found, posting to API");
            res.json(data);
        })
        .catch((err) => {
            throw err
        });
})

app.post("/logs", (req, res) => {
    console.log(req.body);
    console.log("New log request, adding to database...")
    db.Log 
        .create(req.body)
        .then((data) => {
            console.log("Data added!");
            res.json(data);
        })
        .catch((err) => {
            throw err
        });
})


// server start
app.listen(PORT, () => {
    console.log(`API server now listening on PORT ${PORT}!`)
});