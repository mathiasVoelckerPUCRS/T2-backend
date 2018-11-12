var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Yamaform = require('yamaform');
var dbConfig = require('./config');

let yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);

generateTables = async () => {
    await yamaform.generateTables()
  }

  generateTables();