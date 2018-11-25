const BaseView = require('../base-view.js');

class LocacaoController {

    constructor(app, yamaform) {
        this.app = app;
        this.yamaform = yamaform;
        this.formClasses = {
            'formClass':'', 
            'labelClass':'', 
            'inputClass':'form-control',
            'inputWrthis.apperClass':'form-group', 
            'buttonClass':'btn btn-default pull-right'
          }
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

    // async getForm() {
    //     this.app.get('/locacao/new', async (req, res) => {
      
    //       let form = await this.yamaform.generateForm('locacao', {'method':'post', 'action':'/locacao', ...this.formClasses})
          
    //     //   form += "<div><label for='veiculo'>Veiculo</label> <input type='number' name='veiculo' id='veiculo' class='form-control'> </div>"
    //       res.set('Content-Type', 'text/html');
    //       res.send(new Buffer(
    //         BaseView.render(
    //           `<div class="row"><div class="col-md-12">${form}</div></div>`
    //         )
    //       ));
    //     });
    // }
}

module.exports = LocacaoController