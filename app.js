const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Yamaform = require('yamaform');
const dbConfig = require('./config');

const yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);


generateTables = async () => {
    await yamaform.generateTables()
  }

  let formClasses = {
    'formClass':'', 
    'labelClass':'', 
    'inputClass':'form-control',
    'inputWrapperClass':'form-group', 
    'buttonClass':'btn btn-default pull-right'
  }
  

  render = (html) => {
    return '<html>'
          +'<head>'
          +'<title>Yamaform example</title>'
          +'<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">'
          +'</head>'
          +'<body>'
          +'<div class="container">'
          +'<h1 class="text-center">Yamaform</h1>'
          +html
          +'</div>'
          +'</body>'
          +'</html>' 
  }

// generateTables();
app.get('/cliente', async (req, res) => {

  let table = await yamaform.fetch('cliente', {'tableClass':'table', 'viewUrl':'/cliente', 'deleteUrl':'/cliente/delete' })

  res.set('Content-Type', 'text/html');
  res.send(new Buffer(
    render(
      `<div class="row"><div class="col-md-12"><h3>Cliente</h3>${table}</div></div>`
      +`<div class="row"><div class="col-md-12"><a href="/cliente/new" class="btn btn-primary pull-right">Add</a></div></div>`
    )
  ));
});


app.get('/cliente/new', async (req, res) => {

  let form = await yamaform.generateForm('cliente', {'method':'post', 'action':'/cliente', ...formClasses})
  
  res.set('Content-Type', 'text/html');
  res.send(new Buffer(
    render(
      `<div class="row"><div class="col-md-12">${form}</div></div>`
    )
  ));
});

app.post('/cliente', async(req,res) => {
  console.log(req.body)
  let data = {
    "cliente":[
       {"cpf":req.body.cpf, "nome":req.body.nome },
    ]
 }
  let table = await yamaform.insert(data);
  res.redirect('/cliente')
});

module.exports = app;
