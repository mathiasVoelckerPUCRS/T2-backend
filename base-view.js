class BaseView {

    constructor(app, yamaform, objectName) {
        this.app = app;
        this.yamaform = yamaform;
        this.objectName = objectName;
        this.formClasses = {
            'formClass':'', 
            'labelClass':'', 
            'inputClass':'form-control',
            'inputWrthis.apperClass':'form-group', 
            'buttonClass':'btn btn-default pull-right'
          }
      }

        static render(html) {
            return '<html>'
                  +'<head>'
                  +'<title>T2 Construção</title>'
                  +'<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">'
                  +'</head>'
                  +'<body>'
                  +'<div class="container">'
                  +'<nav class="navbar navbar-default" role="navigation">'
                  +'<div class="container-fluid">'
                  +'<div class="navbar-header">'
                  +'<a class="navbar-brand" href="/">T2 Construção</a>'
                  +'</div>'
                  + '<div class="collapse navbar-collapse" id="navbarSupportedContent">'
                  + '<ul class="nav navbar-nav mr-auto">'
                  +  '<li class="nav-item">'
                  +    '<a class="nav-link" href="/cliente">Cliente</a>'
                  +  '</li>'
                  +  '<li class="nav-item">'
                  +    '<a class="nav-link" href="/locacao">Locacao</a>'
                  +  '</li>'
                  +  '<li class="nav-item">'
                  +    '<a class="nav-link" href="/veiculo">Veiculo</a>'
                  +  '</li>'
                  + '</ul>'
                  + '</div>'
                  +'</nav>'
                  +html
                  +'</div>'
                  +'</body>'
                  +'</html>' 
          }

          async getTable() {
              this.app.get(`/${this.objectName}`, async (req, res) => {
             
                let table = await this.yamaform.fetch(this.objectName, {'tableClass':'table', 'viewUrl':`/${this.objectName}`, 'deleteUrl':`/${this.objectName}/delete` })
                res.set('Content-Type', 'text/html');                
                res.send(new Buffer(
                  BaseView.render(
                    `<div class="row"><div class="col-md-12"><h3>${this.objectName}</h3>${table}</div></div>`
                    +`<div class="row"><div class="col-md-12"><a href="/${this.objectName}/new" class="btn btn-primary pull-right">Add</a></div></div>`
                  )
                ));
              });
          }
        
          async getForm() {
              this.app.get(`/${this.objectName}/new`, async (req, res) => {
            
                let form = await this.yamaform.generateForm(this.objectName, {'method':'post', 'action':`/${this.objectName}`, ...this.formClasses})
                
                res.set('Content-Type', 'text/html');
                res.send(new Buffer(
                  BaseView.render(
                    `<div class="row"><div class="col-md-12">${form}</div></div>`
                  )
                ));
              });
          }

        async getEditForm() {
          this.app.get(`/${this.objectName}/:id`, async(req,res) => {
            let form = await this.yamaform.generateForm(this.objectName, {'method':'put', 'action':`/${this.objectName}/update`, 'id':req.params.id, ...this.formClasses})
            res.set('Content-Type', 'text/html');
            res.send(new Buffer(
              BaseView.render(
              `<div class="row"><div class="col-md-12">${form}</div></div>`
            )));  
          })
        }
    }
    module.exports = BaseView
