const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Yamaform = require('yamaform');
const dbConfig = require('./config');
const BaseView = require('./base-view.js');

const yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);


generateTables = async () => {
    await yamaform.generateTables()
  }

// generateTables();
const clienteView = new BaseView(app, yamaform, 'cliente')

clienteView.getTable();

clienteView.getForm();


app.post('/cliente', async(req,res) => {
  let data = {
    "cliente":[
       {"cpf":req.body.cpf, "nome":req.body.nome },
    ]
 }
  let table = await yamaform.insert(data);
  res.redirect('/cliente')
});

module.exports = app;
