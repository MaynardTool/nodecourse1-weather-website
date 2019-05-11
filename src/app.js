const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Edison Dungog"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Edison Dungog"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help and rescue Iron Man from space, please",
    title: "Help",
    name: "Edison Dungog"
  });
});

app.get("/weather", (req, res) => {
  address = req.query.address;
  if (!address) {
    return res.send({
      address: "You must provide an address"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      // API call should be latitude first then longitude
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term"
    });
  }

  console.log(req.query);
  res.send({
    product: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    errorMessage: "Help article not found",
    name: "Edison Dungog"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    errorMessage: "Page not found",
    name: "Edison Dungog"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
