class LocacaoController {

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
           console.log(req.body)
           console.log(data)
            await this.yamaform.insert(data);
            res.redirect('/locacao')
          });
    }
}

module.exports = LocacaoController