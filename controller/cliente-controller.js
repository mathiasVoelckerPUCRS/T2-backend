class ClienteController {

    // Controller que define os métodos de criar, atualizar e deletar Cliente

    constructor(app, yamaform) {
        this.app = app;
        this.yamaform = yamaform;
    }
    // cria cliente com dados recebidos do formulario
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
    // atualiza dados do cliente a partir de dados modificados no formulario
    async updateCliente() {
        this.app.post('/cliente/update', async(req,res) => {
          let data = {
            'cliente':[{'id':req.body.id, 'cpf':req.body.cpf, 'nome':req.body.nome }]
          }
          await this.yamaform.update(data)
          res.redirect('/cliente')
        })
    }
    // deleta cliente solicitado 
    async deleteCliente() {
        this.app.get('/cliente/delete/:id', async(req,res) => {
          let data = {
            "cliente":[{"where":`id = ${req.params.id}`}]
          }
          let response = await this.yamaform.remove(data)
          if (response === undefined) {
            res.status(500).send("Não foi possível deletar o cliente");
          }
          res.redirect('/cliente')
        });
    }
}

module.exports = ClienteController
