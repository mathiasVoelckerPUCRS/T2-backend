class ClienteController {

    constructor(app, yamaform) {
        this.app = app;
        this.yamaform = yamaform;
    }

    async createCliente() {
        this.app.post('/cliente', async(req,res) => {
            let data = {
              "cliente":[
                 {"cpf":req.body.cpf, "nome":req.body.nome },
              ]
           }
            await this.yamaform.insert(data);
            res.redirect('/cliente')
          });
    }
    
    async updateCliente() {
        this.app.post('/cliente/update', async(req,res) => {
          let data = {
            'cliente':[{'id':req.body.id, 'cpf':req.body.cpf, 'nome':req.body.nome }]
          }
          await this.yamaform.update(data)
          res.redirect('/cliente')
        })
    }
    
    async deleteCliente() {
        this.app.get('/cliente/delete/:id', async(req,res) => {
          let data = {
            "cliente":[{"where":`id = ${req.params.id}`}]
          }
          await this.yamaform.remove(data)
          res.redirect('/cliente')
        });
    }
}

module.exports = ClienteController