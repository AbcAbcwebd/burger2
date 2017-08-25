'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'production';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// To connect from command line:    mysql -h us-cdbr-iron-east-05.cleardb.net -u b28cea1118b2c3 -p heroku_dcfa1eb4cd654cc
// Password:   590c0e80

var sequelize = new Sequelize('mysql://b28cea1118b2c3:590c0e80@us-cdbr-iron-east-05.cleardb.net/heroku_dcfa1eb4cd654cc?reconnect=true');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
