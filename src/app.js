const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partilasPath = path.join(__dirname, "../templates/partials");

//setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partilasPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Humphrey Kibet"
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Humphrey Kibet"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some help text",
        title: "Help",
        name: "Humphrey"
    });
});

app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return  res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Humphrey Kibet",
        errorMessage: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Humphrey Kibet",
        errorMessage: "That page is not found"
    });
});

app.listen(port, () => {
    console.log("Server is up on port "+port);
});