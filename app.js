const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Yamaform = require('yamaform');
const dbConfig = require('./config');

const yamaform = new Yamaform(dbConfig, `${__dirname}/database.json`);
const router = express.Router();


generateTables = async () => {
    await yamaform.generateTables()
  }

// generateTables();

router.get('/cliente', async () => {
  let table = await yamaform.fetch('cliente', {'tableClass': 'cliente'});
  console.log(table);
});

router.post('/cliente', async(req,res) => {
  console.log(req.body)
  let data = {
    "cliente":[
       {"cpf":req.body.cpf, "nome":req.body.nome },
    ]
 }
  let table = await yamaform.insert(data);
  // console.log(table);
  return res;
});

app.use(bodyParser.json());
app.use('/api', router);
module.exports = app;
