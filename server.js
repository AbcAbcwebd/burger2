const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));


// Override with POST having ?_method=DELETE/PUT
app.use(methodOverride("_method"));

// Set Handlebars.
const hbs = require("express-handlebars");

app.engine("hbs", hbs({ defaultLayout: "main", extname: 'hbs' }));
app.set("view engine", "hbs");

const routes = require("./controllers/burgers_controller.js");
app.use("/", routes);

var server = app.listen(process.env.PORT || '3000', function(){
  console.log('App listening on Port %s', server.address().port);
  console.log('Press Ctrl+C to quit');
});

console.log("Server running");