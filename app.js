const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Yamaform = require('yamaform');
const dbConfig = require('./config');
const BaseView = require('./base-view.js');
const ClienteController = require('./controller/cliente-controller.js');
const LocacaoController = require('./controller/locacao-controller.js');

const yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);


generateTables = async () => {
    await yamaform.generateTables()
  }

// generateTables();

//HOME
app.get('/', async(req, res) => {
  res.set('Content-Type', 'text/html');                
  res.send(new Buffer(
    BaseView.render('<h1>Welcome to T2-Construção</h1>')
    ));
}) 

const clienteView = new BaseView(app, yamaform, 'cliente')
const locacaoView = new BaseView(app, yamaform, 'locacao');

clienteView.getTable();
clienteView.getForm();
clienteView.getEditForm();

locacaoView.getTable();
locacaoView.getForm();
locacaoView.getEditForm();

const clienteController = new ClienteController(app, yamaform);
const locacaoController = new LocacaoController(app, yamaform);

clienteController.createCliente();
clienteController.updateCliente();
clienteController.deleteCliente();
locacaoController.createLocacao();

module.exports = app;
