const express = require("express");
const router = express.Router();

var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  db.Burger.findAll({}).then(function(burgerData) {
//      res.json(burgerData);
      res.render("index", {burgers: burgerData});
  });
  
});

router.post("/", (req, res) => {
  db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(dbBurger) {
      // We have access to the new todo as an argument inside of the callback function
      res.redirect("/");
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  db.Burger.update({
      devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.redirect("/");
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

router.get("/test", (req, res) => {
  res.send('<h1>Got it!</h1><p>v1</p>');
});

// Export routes for server.js to use.
module.exports = router;
