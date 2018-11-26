
class LocacaoController {

    // Controller que define os métodos de criar, atualizar e deletar Locacao

    constructor(app, yamaform) {
        this.app = app;
        this.yamaform = yamaform;
    }

    async createLocacao() {
        this.app.post('/locacao', async(req,res) => {
            let data = {
              "locacao":[
                {
                    "codigo": req.body.codigo, 
                    "data_inicio": req.body.data_inicio,
                    "data_fim": req.body.data_fim,
                    "valor_total": req.body.valor_total,
                    "cliente_id": req.body.cliente,
                    "veiculo_id": 1 // TODO: pedir correção para formulário atender 2 FK
                },
              ]
           }
            let response = await this.yamaform.insert(data);
            if (response === undefined) {
              res.status(500).send("Não foi possível cadastrar a locação");
            }
            res.redirect('/locacao')
          });
    }

    async updateLocacao() {
      this.app.post('/locacao/update', async(req,res) => {
        let data = {
          'locacao':[
                {
                    "id": req.body.id,
                    "codigo": req.body.codigo, 
                    "data_inicio": req.body.data_inicio,
                    "data_fim": req.body.data_fim,
                    "valor_total": req.body.valor_total,
                    "cliente_id": req.body.cliente,
                    "veiculo_id": 1 // TODO: pedir correção para formulário atender 2 FK
                },
              ]
        }
        try {
          let response = await this.yamaform.update(data);
          if (response === undefined) {
            res.status(500).send("Não foi possível atualizar a locação");
          }
          res.redirect('/locacao')
        } catch (error) {
          res.send(error);
        }
      })
  }
  
  async deleteLocacao() {
      this.app.get('/locacao/delete/:id', async(req,res) => {
        let data = {
          "locacao":[{"where":`id = ${req.params.id}`}]
        }
        let response = await this.yamaform.remove(data)
        if (response === undefined) {
          res.status(500).send("Não foi possível deletar a locação");
        }
        res.redirect('/locacao')
      });
  }
}

module.exports = LocacaoController