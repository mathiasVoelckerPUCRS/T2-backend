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

        render(html) {
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
        
          async getTable() {
              this.app.get(`/${this.objectName}`, async (req, res) => {
             
                let table = await this.yamaform.fetch(this.objectName, {'tableClass':'table', 'viewUrl':`/${this.objectName}`, 'deleteUrl':`/${this.objectName}/delete` })
                res.set('Content-Type', 'text/html');                
                res.send(new Buffer(
                  this.render(
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
                  this.render(
                    `<div class="row"><div class="col-md-12">${form}</div></div>`
                  )
                ));
              });
          }
    }

    module.exports = BaseView
