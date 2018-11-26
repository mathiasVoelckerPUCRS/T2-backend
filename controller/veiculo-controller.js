class VeiculoController {

    // Controller que define os métodos de criar, atualizar e deletar Veiculo

    constructor(app, yamaform) {
        this.app = app;
        this.yamaform = yamaform;
    }
    // cria veiculo com dados recebidos do formulario
    async createVeiculo() {
        this.app.post('/veiculo', async(req,res) => {
            let data = {
              "veiculo":[
                 {
                     "renavam": req.body.renavam, 
                     "marca": req.body.marca,
                     "modelo": req.body.modelo,
                     "valor_diaria": req.body.valor_diaria
                 },
              ]
           }
            await this.yamaform.insert(data);
            res.redirect('/veiculo')
          });
    }
    // atualiza dados de um veiculo a partir de dados modificados no formulario
    async updateVeiculo() {
        this.app.post('/veiculo/update', async(req,res) => {
          let data = {
            'veiculo':[{
                "id": req.body.id,
                "renavam": req.body.renavam, 
                "marca": req.body.marca,
                "modelo": req.body.modelo,
                "valor_diaria": req.body.valor_diaria
            },]
          }
          await this.yamaform.update(data)
          res.redirect('/veiculo')
        })
    }
     // deleta veiculo solicitado
    async deleteVeiculo() {
        this.app.get('/veiculo/delete/:id', async(req,res) => {
          let data = {
            "veiculo":[{"where":`id = ${req.params.id}`}]
          }
          let response = await this.yamaform.remove(data)
          if (response === undefined) {
            res.status(500).send("Não foi possível deletar o veículo");
          }
          res.redirect('/veiculo')
        });
    }
}

module.exports = VeiculoController
